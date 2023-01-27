import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameBoardGuard implements CanActivate {

  constructor(
    private router: Router,
    private cookie: CookieService
  ){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkGamingSession();
  }


  checkGamingSession():boolean{
    try {

      const token = this.cookie.check('gaming');
      if(!token){
        this.router.navigate(['/lobby']);
        return false;
      }
      return true;
    } catch (error) {
        console.error(error);
        return false;
    }
  }
}
