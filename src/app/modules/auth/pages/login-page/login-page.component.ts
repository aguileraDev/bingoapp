import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  imageBackground: string = 'assets/images/bingo_background.jpg';
  googleIcon: string = '';
  errorSession: boolean = false;
  screenWidth: number = 0;
  loginForm: FormGroup = new FormGroup({});
  registerRoute: Array<any> = [];


  constructor(
    private authService: AuthService,
    private router: Router,

    ) {

    }

  ngOnInit(): void {

 /* Creación de un grupo de formularios con dos controles, correo electrónico y contraseña. */
    this.registerRoute = ['/auth','register'];
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
  }



/**
 * Estamos usando la función `sendCredentials` de `AuthService` para enviar las credenciales del
 * usuario al servidor. Si el servidor responde con un mensaje de éxito, navegamos a la página de
 * lobby. Si el servidor responde con un mensaje de error, mostramos un mensaje de error al usuario
 */
  sendLogin(): void {
     const { email, password } = this.loginForm.value;
     this.authService.sendCredentials(email, password).subscribe({
      next: (response:any) => {
        this.router.navigate(['lobby']);
      },
      error: (err) => {
        this.errorSession = true;
        console.error('login error', err);
      },
    });
  }

  goToGithub():void{
    this.router.ngOnDestroy();
    window.location.href = 'https://github.com/aguileraDev';
  }
}
