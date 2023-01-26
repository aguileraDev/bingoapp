import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /* Local environment url = http://localhost:9090/api/v1 */

  private readonly url = 'http://localhost:9090/api/v1';

  constructor(
    private http: HttpClient) {

  }


  /**
   * Esta función crea un nuevo juego y devuelve un observable del objeto del juego.
   * @param {string} playerId - La identificación del jugador.
   * @returns Un observable de cualquier tipo.
   */
  createGame$(playerId: string): Observable<any> {

    const body = {
      playerId
    };

    return this.http.post(`${this.url}/bingo/new`, body);

  }

  /**
   * Genera un carton con valores aleatorios de forma ordenada segun el
   * gameId, toma el id como parámetro y devuelve un Observable de tipo any
   * @param {number} gameId - La identificación del juego para el que desea generar un cartón.
   * @returns Un observable de cualquier tipo.
   */
  generateCardboard$(gameId: number): Observable<any> {

    const body = {
      game: {
        gameId
      }
    };

    return this.http.post(`${this.url}/bingo/cardboard/game`, body);
  }

  /**
   * Devuelve un observable de una matriz de objetos con las fichas de un * juego.
   * @param {number} id - id del juego
   * @returns Una matriz de objetos con la siguiente estructura:
   */
  getAllTokensByGame(id: number): Observable<any> {

    return this.http.get(`${this.url}/bingo/cardboard/game/all/${id}`)
      .pipe(map(({ data }: any) => {
        return data;
      }))
  }

  /**
   * Toma un valor y un gameId y devuelve un observable de los datos
   * devueltos por el servidor
   * @param {number} value - El valor del resultado
   * @param {number} gameId - La identificación del juego para el que desea guardar el resultado.
   * @returns Una ficha de resultado.
   */
  saveResult(value: number, gameId: number): Observable<any> {

    const body = {
      game: {
        gameId
      },
      value
    };

    return this.http.post(`${this.url}/bingo/result/save`, body)
      .pipe(map(({ data }: any) => {
        return data;
      }));
  }

  /**
 * Toma una identificación de juego y devuelve un observable del juego
 * con estado del ganador.
 * @param {number} id - El id del juego que contiene al usuario el cual deseas marcar como ganador.
 * @returns Observable
 */
  wonGame(id: number): Observable<any> {
    const body = {};

    return this.http.patch(`${this.url}/bingo/game/${id}/winner`, body);
  }

  /**
   * Toma una identificación de juego y devuelve un observable del juego
   * finalizado
   * @param {number} id - El id del juego que quieres terminar.
   * @returns Observable
   */
  finishGame(id: number): Observable<any> {
    const body = {};

    return this.http.patch(`${this.url}/bingo/game/${id}/finish`, body);
  }

  /**
   * Toma un ID de usuario como parámetro, realiza una solicitud GET al
   * servidor y devuelve los datos
   * del servidor.
   * @param {string} userId - El ID de usuario del usuario que desea
   * encontrar.
   * @returns El objeto de usuario
   */
  findUserById(userId: string): Observable<any> {

    return this.http.get(`${this.url}/bingo/users/id/${userId}`)
      .pipe(map(({ data }: any) => {
        return data;
      }))
  }

  /**
   * Toma un correo electrónico como parámetro, realiza una solicitud de
   * obtención al backend y devuelve
   * el objeto de usuario
   * @param {string} email - cadena - el correo electrónico del usuario que
   * desea encontrar
   * @returns El objeto de usuario
   */
  findUserByEmail(email: string): Observable<any> {

    return this.http.get(`${this.url}/bingo/users/email/${email}`)
      .pipe(map(({ data }: any) => {
        return data;
      }))
  }
}
