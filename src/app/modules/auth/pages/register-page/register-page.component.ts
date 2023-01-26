import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { OnExit } from '@shared/guards/exit.guard';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnExit, AfterViewInit {

  registerForm: FormGroup = new FormGroup({});
  registerError: boolean = false;
  goToHome: boolean = false;

  @ViewChild('home') home : ElementRef<HTMLElement> = {} as ElementRef<HTMLElement>;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    
  /* Crear un grupo de formularios con el nombre del control de formulario y los validadores. */
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)])
    });
  }

  ngAfterViewInit(): void {
    this.home.nativeElement.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.goToHome = true;
      this.router.navigate(['/auth/login']);
    })
  }

  registerUser(): void {
    const { name, lastname, email, password, confirmPassword } = this.registerForm.value;

    const data = {
      name,
      lastname,
      email,
      password
    };

    if (password != confirmPassword || this.registerForm.invalid) {
      this.registerError = true;
    } else {
        this.authService.register(data).subscribe({
        next: (response) => {
          this.router.navigate(['auth']);
        },
        error: (err) => {
          console.error(err);
        }
      })

    }
  }

  onExit(): boolean {
    if (this.registerForm.dirty && this.registerError || this.goToHome) {
      return confirm("¿Estas seguro de abandonar el registro?")
    }else if(this.registerForm.valid){
      return true;
    }
    return false;
  };
}
