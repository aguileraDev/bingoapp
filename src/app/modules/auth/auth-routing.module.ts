import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ExitGuard } from '@shared/guards/exit.guard';

/* Definición de las rutas para el módulo de autenticación. */
const routes: Routes = [
  {
    path:'login',
    component: LoginPageComponent
  },
  {
    path:'register',
    component: RegisterPageComponent,
    canDeactivate: [ExitGuard]
  },
  {
    path:'**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
