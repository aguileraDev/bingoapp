import { Component, OnInit } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  player: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private apiService: ApiService,
    private cookie: CookieService,

  ){

  }

  ngOnInit(): void {
    this.getUser();
  }

 /**
  * Esta función se llama cuando se inicializa el componente. Utiliza el
  * servicio de cookies para
  * obtener la identificación del jugador y luego usa el servicio API para
  * obtener el nombre del jugador.
  */
  getUser():void{
     this.apiService.findUserById(this.cookie.get('player')).subscribe({
      next: (response : any) => {
        this.player.next(response.name);
      }
    })
  }
}
