import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from '@shared/services/socket-web.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, AfterViewInit {

  status: boolean = false;
  screenWidth: number = 0;
  links: Array<any> = [];
  desktop: boolean = true;
  player: string = '';
  home: Array<any> = [];
  @Input() playerSide: BehaviorSubject<string> = new BehaviorSubject('');

  @ViewChild('sidebar') sidebar: ElementRef<HTMLElement> = {} as ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private cookie: CookieService,
    private socketService: SocketWebService
  ) {

  }

  ngOnInit(): void {
    this.home = ['/lobby'];

    this.playerSide.subscribe({
      next: (response: any) => {
        this.player = response;
      }
    });


    this.getScreenWitdh();

  }

  ngAfterViewInit(): void {

    this.links = [
      {
        name: 'Lobby',
        icon: 'uil-home',
        router: ['/', 'lobby']
      },
    ]
  }

  /**
   * Esta función obtiene el ancho de pantalla del dispositivo del usuario
   * y establece la variable móvil
   * en verdadero si el ancho de pantalla es inferior a 996 px.
   */
  getScreenWitdh(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 996) {
      this.desktop = false;
    }
  }

  /**
   * La función cambia el estado de la barra lateral y agrega o elimina la clase 'abierta' del elemento
   * de la barra lateral
   */
  toogleBar(): void {
    this.status = !this.status;
    if (this.status) {
      this.renderer.addClass(this.sidebar.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.sidebar.nativeElement, 'open');
    }
  }


 /**
  * Cierra la sesión del usuario del juego, elimina todas las cookies y lleva al usuario a la página de
  * inicio de sesión
  */
  exitApp(): void {
    this.socketService.logoutUser(this.cookie.get('player'));
    this.cookie.deleteAll('/');
    this.router.navigate(['/auth/login']);
  }
}

