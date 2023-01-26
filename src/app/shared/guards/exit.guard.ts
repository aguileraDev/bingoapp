import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

/* Definición de una interfaz que tiene un método llamado onExit que devuelve un valor booleano o
UrlTree. */
export interface OnExit{
  onExit: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree ;
}
@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {
 /**
  * Si el componente tiene una función onExit, llámela y devuelva el resultado. De lo contrario,
  * devuelve verdadero
  * @param {OnExit} component - OnExit: el componente del que se está navegando.
  * @param {ActivatedRouteSnapshot} currentRoute - ActivatedRouteSnapshot: la ruta actual
  * @param {RouterStateSnapshot} currentState - RouterStateSnapshot: el estado actual del enrutador.
  * @param {RouterStateSnapshot} [nextState] - RouterStateSnapshot - El futuro RouterStateSnapshot
  * @returns Un booleano o un UrlTree.
  */
  canDeactivate(
    component: OnExit,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return component.onExit ? component.onExit() : true;
  }

}
