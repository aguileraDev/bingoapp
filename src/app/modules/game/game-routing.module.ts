import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LosingPageComponent } from './pages/losing-page/losing-page.component';
import { WinningPageComponent } from './pages/winning-page/winning-page.component';
import { ExitGuard } from '@shared/guards/exit.guard';


/* Estas son las rutas para el modulo de juego. */
const routes: Routes = [
  {
    path:':id',
    component:GamePageComponent,
    canDeactivate: [ExitGuard]
  },

  {
    path: ':id/loser',
    component: LosingPageComponent
  },

  {
    path: ':id/winner',
    component: WinningPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
