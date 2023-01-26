import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'http://localhost:9091/api/1.0';

  constructor(private http: HttpClient, private cookie: CookieService) { }


  /**
   * Envío de las credenciales al backend. Asigna una cookie llamada
   * session_token con el jwt emitido y una cookie player con el id
   * del jugador que ha iniciado sesion
   * @param {string} email - string
   * @param {string} password - string
   * @returns La respuesta del backend.
   */
  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };


    return this.http.post(`${this.url}/auth/login`, body).pipe(
      tap((response: any) => {
        const { data, token } = response;
        this.cookie.set('session_token', token, 1, '/');
        this.cookie.set('player',data.id,1,'/');
      })
    );
  }

  /**
   * Toma un objeto como argumento y devuelve un observable de tipo any
   * @param {Object} body - Objeto
   * @returns Observable<cualquiera>
   */
  register(body: Object): Observable<any> {
    return this.http.post(`${this.url}/auth/register`, body);
  }
}
