import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { SharedModule } from '@shared/shared.module';
import { LobbyPageComponent } from './pages/lobby-page/lobby-page.component';



@NgModule({
  declarations: [
    LobbyPageComponent
  ],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    SharedModule,
  ]
})
export class LobbyModule { }
