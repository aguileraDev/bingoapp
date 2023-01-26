import { EventEmitter, Injectable, Output } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})

export class SocketWebService {
  @Output() data$: EventEmitter<any> = new EventEmitter();
  @Output() gaming$: EventEmitter<any> = new EventEmitter();
  @Output() button$: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private socket: Socket,
    private apiService: ApiService
  ) {
    this.getUsers();
  }


 /**
  * Esta función se llama cuando un usuario ingresa al lobby. Toma la
  * identificación del usuario como
  * parámetro y envía una solicitud al backend para obtener el nombre del
  * usuario. Luego crea un nuevo
  * objeto con la identificación del usuario, el nombre y si ha ganado o
  * perdido como booleanos en falso.
  * Luego, este objeto se envía al backend a través de socket.io
  * @param {string} user - cadena - La identificación del usuario
  */
  sendUserOnSystem(user: string): void {
    this.apiService.findUserById(user).subscribe({
      next: (response: any) => {
        const newUser = {
          id: user,
          name: response.name,
          won: false,
          loser: false,
        }
        this.socket.emit('event:lobby', newUser);
      }
    })
  }

 /* Obtiene los usuarios conectados al sistema. Escucha el evento "event:connected" y al recibirlo, emite los datos recibidos a través de un observable para que esten disponibles en la lista de usuarios conectados */
  getUsers(): void {
    this.socket.on('event:connected', (res: any[]) => {
      this.data$.emit(res);
    })
  };
/**
 * Emite un evento al servidor con el id y estado del usuario a modificar
 * en funcion si ha ganado o perdido un juego
 * @param {string} id - El id del usuario cuyo estado se está cambiando.
 * @param {string} status - cadena - el estado del usuario
 */

  changeStatusUser(id: string, status: string): void {
    const data = {
      id,
      status
    };

    this.socket.emit('event:status', (data));
  }

 /**
  * establece un usuario como jugando. Emite un evento "event:gaming" con
  * el ID del usuario.
  * @param {string} id - La identificación del usuario que está jugando.
  */
  setUserGaming(id: string): void {
    this.socket.emit('event:gaming', { id });
  }

/**
 * Emite un evento al servidor, diciéndole que el usuario ya no está jugando
 * @param {string} id - El id del usuario que está saliendo.
 */
  logoutUserGaming(id: string): void {
    this.socket.emit('event:offgaming', { id });
  }

  /**
   * Obtiene información sobre un juego en progreso. Escucha el evento
   * "event:gameprogress" y al recibirlo, emite los datos recibidos a
   * través de un observable
   */
  gameInProgress(): void {
    this.socket.on('event:gameprogress', (res: any[]) => {
      this.gaming$.emit(res);
    })
  }

 /**
  * La función emite un evento al servidor con el estado del botón "Jugar"
  * @param {boolean} status - booleano: verdadero si el botón está presionado, falso si no lo está.
  */
  changeStatePlayButton(status: boolean): void {
    this.socket.emit('event:button', status);
  }

  /**
   * Esta función se utiliza para obtener el estado del botón de "Jugar"
   * del servidor.
   */
  getStatePlayButton(): void {
    this.socket.on('event:button', (res: boolean) => {
      this.button$.emit(res);
    })
  }

 /**
  * Desconecta un usuario. Emite un evento "event:logout" con el ID del
  * usuario y llama a la función "logoutUserGaming" para desconectar al
  * usuario si se encuentra en la matriz de usuarios jugando.
  * @param {string} id - El id del usuario que está saliendo.
  */
  logoutUser(id: string): void {
    this.socket.emit('event:logout', { id });
    this.logoutUserGaming(id);
  }
}
