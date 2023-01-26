import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private router: Router, private cookie: CookieService){

  }
  /**
   * La función devuelve un valor booleano que determina si el usuario puede acceder a la ruta o no
   * @param {ActivatedRouteSnapshot} route - ActivatedRouteSnapshot: la ruta que se está activando.
   * @param {RouterStateSnapshot} state - RouterStateSnapshot: el estado actual del enrutador
   * @returns Un valor booleano.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkCookieSession();
  }



  /**
   * Verifica si existe un token de sesion valido si es asi, devuelve
   * verdadero diciendole al guard
   * session que permita la navegacion hacia el lobby, de lo contrario,
   * devuelve falso y niega la
   * navegacion
   * @returns Un valor booleano.
   */
  checkCookieSession():boolean{
    try {
      const token = this.cookie.check('session_token');
      if(!token){
        this.router.navigate(['auth']);
      }
      return token;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
