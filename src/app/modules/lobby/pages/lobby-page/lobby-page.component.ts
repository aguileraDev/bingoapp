import {  Component,  OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { SocketWebService } from '@shared/services/socket-web.service';
import { ApiService } from '@shared/services/api.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.css']
})
export class LobbyPageComponent implements OnInit {
  // url de la imagen de formas de como ganar
  waysToWin: string = 'assets/images/bingo-waysToWin.png';
  player: string = '';
  game: number = 0;
  showCountDown: boolean = false;
  buttonDisabled: boolean = false;
  socketData: Array<any> = [];

  constructor(
    private apiService: ApiService,
    private cookie: CookieService,
    private router: Router,
    private socketWebService: SocketWebService
  ){
    this.player = this.cookie.get('player');
    this.socketWebService.sendUserOnSystem(this.player);
    this.socketWebService.gameInProgress();
    this.socketWebService.getStatePlayButton()
  }

  ngOnInit():void{

    /* Esta es una suscripción para mostrar la cuenta regresiva y
     * habilitar o deshabilitar el boton "jugar" en funcion si un usuario
     * esta jugando
    */
    this.socketWebService.button$.subscribe({
      next: (response : boolean) => {
        this.showCountDown = response;
        this.buttonDisabled = response;
      }
    })

  }

/**
 * La función inicia un juego llamando a la función createGame$ desde
 * el apiService que devuelve una
 * respuesta que contiene el gameId. Luego, el gameId se pasa a la función
 * de cartón, que llama a la
 * función geenerateCardboard$ desde apiService, que devuelve una
 * respuesta que contiene el cartón.
 */

  startGame(){

    this.apiService.createGame$(this.player).subscribe({
      next: response => {
        this.game = response.data.gameId;
        this.cardboard(this.game);

      },
      error: err =>{
        console.error(err);
      }
    })

  }

  /**
   * La función toma un id de juego como argumento y luego llama a la
   * función generateCardboard$
   * desde apiService, que devuelve un observable. Si la respuesta
   * del backend es exitosa entonces navega a la ruta del juego
   * si hay algun error lo muestra en consola
   * @param {number} game - número
   */
  cardboard(game: number):void {
    this.apiService.generateCardboard$(game).subscribe({
      next: (response:any) => {
        this.router.navigate([`game/${this.game}`])
      },
      error: err =>{
        console.error(err);
      }
    })
  }

  /**
   * La función toma un valor booleano como argumento y establece la propiedad buttonDisabled en el
   * opuesto del valor booleano.
   * @param {boolean} event - booleano: este es el evento que se emite
   * desde el temporizador de cuenta regresiva.
   */
  getCountDownEvent(event: boolean):void{
    this.buttonDisabled = !event;
  }
}
