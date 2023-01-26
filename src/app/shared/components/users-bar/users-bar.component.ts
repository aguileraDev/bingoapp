import { Component,  OnInit } from '@angular/core';
import { SocketWebService } from '@shared/services/socket-web.service';


@Component({
  selector: 'app-users-bar',
  templateUrl: './users-bar.component.html',
  styleUrls: ['./users-bar.component.css']
})
export class UsersBarComponent implements OnInit {
  users: Array<any> = [];
  gamers: Array<any> = [];

  constructor(
    private socketWebService: SocketWebService
  ){
    /* Obtiene los usuarios conectados, los usuarios que esten jugando y suscribiéndose a los datos $ observables al recibir la informacion los muestra en el componente */
    this.socketWebService.getUsers();
    this.socketWebService.gameInProgress();
    this.socketWebService.data$.subscribe({
      next: (response : any) => {
        this.users = response;

      }
    })
  }

  ngOnInit(): void {
    /* Escucha los eventos "gaming" del servidor y lo agrega a la matriz gamers luego verifica si existe un usuario actualmente jugando y enviando esa informacion al boton de "jugar" para inhabilitar o habilitar */
    this.socketWebService.gaming$.subscribe({
      next: (response : any[]) => {
        this.gamers = response;
        this.buttonStatus();

      }
    })
  }

 /**
  * Comprueba si el número de jugadores es mayor que 0, si lo es, devuelve
  * verdadero, de lo contrario, devuelve falso
  */
  buttonStatus():void{
    const status =  this.gamers.length > 0? true: false;
    this.socketWebService.changeStatePlayButton(status);
  }
}
