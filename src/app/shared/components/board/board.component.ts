import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordsModel } from '@core/models/records.model';
import { ApiService } from '@shared/services/api.service';
import { SocketWebService } from '@shared/services/socket-web.service';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  paramsRoute: number = 0;
  resultValue: Subject<number> = new Subject();
  timerExecute$: Subject<boolean> = new Subject();
  data: Array<RecordsModel> = [];
  @Output() exitEvent$: EventEmitter<boolean> = new EventEmitter();

 /**
  * Esta función se usa para configurar al usuario como en línea y jugando, y para obtener la lista de
  * usuarios en línea y el juego en curso.
  * @param {ActivatedRoute} activeRoute - ActivatedRoute: esta es la ruta
  * que está actualmente activa.
  * @param {ApiService} apiService - Este es el servicio que se utilizará
  * para realizar las llamadas
  * API al backend.
  * @param {SocketWebService} socketWebService - Este es el servicio de
  * websockets.
  * @param {CookieService} cookie - CookieService: este es un servicio que
  * le permite trabajar con cookies.
  */
  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private socketWebService: SocketWebService,
    private cookie: CookieService
  ){
    this.socketWebService.sendUserOnSystem(this.cookie.get('player'));
    this.socketWebService.setUserGaming(this.cookie.get('player'));
    this.socketWebService.getUsers();
    this.socketWebService.gameInProgress();

  }

  ngOnInit(): void {

    /* Esta es una función que se utiliza para inicializar el cronómetro en cada juego. */
    setTimeout(() => this.timerExecute$.next(true), 1000);

    /* Esta es una suscripción a los parámetros de ruta, que es la identificación del juego. */
    this.activeRoute.params.subscribe({
      next: (params: any) => {
        this.paramsRoute = Number(params.id);
      }
    })
    /* Obtiene todas las fichas del carton de un juego segun el id */
    this.apiService.getAllTokensByGame(this.paramsRoute).subscribe({
      next: (response: any) => {
        this.data = response;
      }
    })

  }

 /**
  * La función getTimerData() toma un evento como argumento y lo pasa a la
  * propiedad resultValue.
  * Cada evento es la ficha emitida por el temporizador que luego sera
  * guardada por cardboard en un arreglo de resultados
  * @param {number} event - número: el evento es el valor que se pasa desde el componente cardboard.
  */
  getTimerData(event: number):void{
      this.resultValue.next(event);
    }
  /**
   * La función getTimerOrder() es una función que inicializa el
   * temporizador en cada juego
   * @param {boolean} event - booleano
   */
  getTimerOrder(event: boolean): void{
    this.timerExecute$.next(event);
  }

  /**
   * La función toma un valor booleano para definir la salido de la vista
   * como argumento y lo emite al componente padre
   * @param {boolean} event - booleano: este es el evento que se emite desde el componente cardboard.
   */
  getPlayerEvent(event: boolean):void{
    this.exitEvent$.emit(event);
  }
}
