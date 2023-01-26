import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


/* rutas para el módulo de inicio. Carga perezosa */
const routes: Routes = [

  {
    path:'lobby',
    loadChildren: () => import(`@modules/lobby/lobby.module`).then((m) => m.LobbyModule)
  },

  {
    path:'game',
    loadChildren: () => import(`@modules/game/game.module`).then((m) => m.GameModule),

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
