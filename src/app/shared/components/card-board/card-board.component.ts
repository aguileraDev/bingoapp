import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordsModel } from '@core/models/records.model';
import { ApiService } from '@shared/services/api.service';
import { SocketWebService } from '@shared/services/socket-web.service';
import { CookieService } from 'ngx-cookie-service';
import {  Subject } from 'rxjs';

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html',
  styleUrls: ['./card-board.component.css']
})
export class CardBoardComponent implements OnInit {

  // Almacena el valor de las fichas generadas por el backend para este
  //carton
  @Input() cardboardData: Array<RecordsModel> = new Array<RecordsModel>(25) ;
  // Almacena el valor de cada ficha que el jugador marca
  gamerTokens: Array<number> = [];
  // Almacena los resultados emitidos por el temporizador en cada ronda
  results: Array<number> = [];
  // Representa el indice de cada ficha en el carton de bingo
  i: number = 0;
  // Parametro del id del juego
  routeParam: number = 0;
  // simula las posiciones de las fichas en el carton
  cardPositions: Array<boolean> = new Array(25);
  // Indica si el jugador es ganador o perdedor
  winnerStatus: boolean = false;
  // Almacena si el jugador ha completado o no algun patron ganador
  waysToWin: Array<boolean> = [];
  // Escucha los valores emitidos por el temporizador para luego
  // almacenarlos en el arreglo resultado
  @Input() timerData$: Subject<number> = new Subject();
  // Emite un valor que detiene la ejecucion del temporizador una vez que
  // el jugador hace click en el boton de bingo
  @Output() timerRun$: EventEmitter<boolean> = new EventEmitter();
  // Emite que el jugador ha pulsado el boton de bingo permitiendo
  // la navegacion hacia la pagina ganadora o perdedora
  @Output() playerEvent$: EventEmitter<boolean> = new EventEmitter();

 /**
  * Esta función se llama cuando se crea el componente. Configura la conexión de socket y se suscribe
  * al evento gameInProgress
  * @param {Router} router - Enrutador: este es el servicio de enrutador angular. Nos permite navegar a
  * diferentes rutas en nuestra aplicación.
  * @param {ActivatedRoute} activeRoute - Esto se usa para obtener la identificación del juego en el
  * que se encuentra actualmente el usuario.
  * @param {ApiService} apiService - Este es el servicio que se utilizará para realizar llamadas API al
  * backend.
  * @param {SocketWebService} socketWebService - Este es el servicio que creamos en la sección
  * anterior.
  * @param {CookieService} cookie - CookieService: este es un servicio que nos permite configurar y
  * obtener cookies.
  */
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private socketWebService: SocketWebService,
    private cookie: CookieService
  ) {
    this.socketWebService.gameInProgress();
  }

  /**
   * La función se llama cuando se inicializa el componente. Establece el
   * estado inicial del componente, se suscribe al observable timerData$ y
   * se suscribe al observable activeRoute.params. Marca todas las
   * posiciones del carton como vacias
   */
  ngOnInit(): void {
    this.cardPositions.fill(false);

    this.timerData$.subscribe({
      next: (response: number) => {
        this.apiService.saveResult(response, this.routeParam).subscribe({
          next: (response: any) => {
            this.results.push(response.value);
          }
        })
      }
    })

    this.activeRoute.params.subscribe({
      next: (params: any) => {
        this.routeParam = Number(params.id);
      }
    })

  }
  /**
   * La función se llama cuando un jugador indica que ha hecho bingo
   * conecta con el backend finaliza el juego enviando como parametro
   * el id de ruta que es el mismo gameId.
   * Comprueba la propiedad winnerStatus y, si es verdadera,
   * navega a la página ganadora; de lo contrario, navega a la página
   * perdedora.
   */

  defineGame(): void {
    this.sendTimerRun(false);
    this.socketWebService.logoutUserGaming(this.cookie.get('player'));
    this.apiService.finishGame(this.routeParam).subscribe({
      next: (response) => {
        console.log("game finished");
      },
      error: (err) => {
        console.error(err);
      }
    })

    switch (this.winnerStatus) {
      case true: {
        this.apiService.wonGame(this.routeParam);
        this.socketWebService.changeStatusUser(this.cookie.get('player'), 'won');
        this.playerEvent$.emit(true);
        this.router.navigate([`game/${this.routeParam}/winner`]);
      } break;

      case false: {
        this.socketWebService.changeStatusUser(this.cookie.get('player'), 'loser');
        this.playerEvent$.emit(true)
        this.router.navigate([`game/${this.routeParam}/loser`]);
      } break;
    }
  }

  /**
   * Esta función emite un valor booleano al sujeto timerRun$ controlando
   * la ejecucion del temporizador. Una vez el usuario pulsa sobre el
   * boton de bingo esta funcion es llamada y envia la orden de detener el
   * temporizador
   * @param {boolean} value - booleano: este es el valor que se enviará al componente principal.
   */
  sendTimerRun(value: boolean): void {
    this.timerRun$.emit(value);
  }

  /**
   * Cada vez que el jugador marca una ficha obtiene el indice y el valor
   * de esa celda o cuadricula, luego la inhabilita, registra esa posicion,
   * guarda el valor dentro del arreglo gamerTokens indicando que el jugador
   * marco esa ficha
   * @param {number} value - número: el valor del token en el que se hizo clic
   * @param {number} index - número: el índice de la celda en la que se hizo clic
   */
  markToken(value: number, index: number): void {
    document.getElementById(value.toString())!.classList.add('disabled');
    this.markPosition(index);
    this.gamerTokens.push(value);
    this.rulesToWin();
    this.socketWebService.setUserGaming(this.cookie.get('player'))

  }
  /**
   * Esta función marca la posicion de la ficha en el carton de bingo
   * @param {number} positionValue - La posición de la ficha en el carton.
   */

  markPosition(positionValue: number): void {
    this.cardPositions[positionValue] = true;
  }


  /**
   * Comprueba si hay un ganador comprobando una victoria en las esquinas,
   * una victoria completa, una victoria diagonal, una victoria horizontal
   * o una victoria vertical.
   */
  rulesToWin(): void {
    this.cornerWin();
    this.fullWin();
    this.linearWin(0, 25, 'diagonal');

    let n = 0;
    while (n < 5) {
      this.linearWin(5 * n, (5 * n + 5), 'horizontal');
      this.linearWin(n, n + 21, 'vertical');
      n++;
    }

    const winner = this.waysToWin.some(element => element === true);

    console.log(`valor de winner ${winner}`);
    if (winner) {
      this.winnerStatus = true;
      console.log('hay un ganador');
    }

  }
  /**
   * Comprueba si el jugador ha completado todo el carton de bingo
   * si es asi verifica que realmente sea un ganador
   */

  fullWin(): void {
    const status = this.cardPositions.every(element => element === true);
    if (status) {
      const data = this.cardboardData.map(element => element.value);
      const result = this.verifyWinner(data);

      this.waysToWin.push(result);
    }

  }

  /**
   * Comprueba si el jugador ha ganado de forma horizontal, vertical o diagonal
   * @param {number} start - la posición inicial de la línea
   * @param {number} end - número - El final de la línea
   * @param {string} direction - 'horizontal', 'vertical', 'diagonal'
   */
  linearWin(start: number, end: number, direction: string): void {

    if (direction === 'horizontal') {
      const line = this.cardPositions.slice(start, end);
      const validLine = line.every(element => element === true);

      if (validLine) {
        const data = this.cardboardData.slice(start, end).map(element => element.value);
        const result = this.verifyWinner(data);

        this.waysToWin.push(result);
      }

    } else if (direction === 'vertical') {
      const line = this.getElementInPositions(this.cardPositions, start, 5);
      const validLine = line.every(element => element === true);

      if (validLine) {
        const data = this.getElementInPositions(this.cardboardData, start, 5)
          .map(element => element.value);
        const result = this.verifyWinner(data);
        this.waysToWin.push(result);

      }
    } else if (direction === 'diagonal') {
      let validate: Array<boolean> = [];

      const normal = this.getElementInPositions(this.cardboardData, start, 6)
        .map(element => element.value);

      const invert = this.getElementInPositions(this.cardboardData, start + 4, 4)
        .map(element => element.value).slice(0, 5);


      const positionsOfNormal = this.getElementInPositions(this.cardPositions, start, 6);
      const positionsOfInvert = this.getElementInPositions(this.cardPositions, start + 4, 4).slice(0, 5);

      const diagonalOne = positionsOfNormal.every(element => element === true);
      const diagonalTwo = positionsOfInvert.every(element => element === true);

      if (diagonalOne || diagonalTwo) {
        validate.push(this.verifyWinner(normal));
        validate.push(this.verifyWinner(invert));
        const result = validate.some(element => element === true);

        this.waysToWin.push(result);
      }
    }
  }

  /**
   * Comprueba si las esquinas del cartón de bingo están marcadas y si lo están, comprueba si es una combinación ganadora
   */
  cornerWin(): void {
    const dataCorner: Array<number> = [];
    const positionsCorner: Array<boolean> = [];

    for (let index = 0; index < 25; index++) {

      if (index == 0 || index == 4 || index == 20 || index == 24) {
        dataCorner.push(this.cardboardData.map(element => element.value)[index]);
        positionsCorner.push(this.cardPositions[index]);
      }
    }
    const validCorner = positionsCorner.every(element => element === true);
    if (validCorner) {
      const result = this.verifyWinner(dataCorner);

      this.waysToWin.push(result);
    }

  }

  test(): void {
    this.results.push(1, 15, 66, 62);

  }

  /**
   * "Dada una lista, una posición inicial y un paso, devuelva una nueva
   * lista que contenga los elementos de la lista original, comenzando en la
   * posición inicial y aumentando según ciertas posiciones".
   *
   * La función toma tres parámetros:
   *
   * lista: una matriz de cualquier tipo
   * inicio: un número que representa la posición inicial
   * paso: un número que representa cada cuantas posiciones debe recorrer
   * La función devuelve una matriz del mismo tipo que la matriz de entrada
   * @param list - La lista de elementos a filtrar.
   * @param {number} start - la posición inicial de la lista
   * @param {number} step - el número de elementos a saltar
   * @returns [1, 3, 5, 7, 9]
   */

  getElementInPositions(list: Array<any>, start: number, step: number): Array<any> {

    let result = [];

    for (let i = start; i < list.length; i += step) {
      result.push(list[i]);
    }
    return result;
  }

  /**
   * Toma un arreglo de datos, verifica si el arreglo contiene solo las
   * fichas del jugador, es decir, que ha marcado las fichas en su carton
   * luego, verifica si el arreglo contiene solo las fichas ganadoras
   * emitidas.
   * @param data - Array<any>: esta es el arreglo de tokens que estamos
   * comprobando para ver si son todos iguales.
   * @returns Un valor booleano.
   */
  verifyWinner(data: Array<any>): boolean {
    const gamerCheck = data.every(element => this.gamerTokens.includes(element));
    if (gamerCheck) {
      const win = data.every(element => this.results.includes(element));
      return win;
    }
    return false;
  }
}
