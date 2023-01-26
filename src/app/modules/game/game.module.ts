import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { SharedModule } from '@shared/shared.module';
import { LosingPageComponent } from './pages/losing-page/losing-page.component';
import { WinningPageComponent } from './pages/winning-page/winning-page.component';


@NgModule({
  declarations: [
    GamePageComponent,
    LosingPageComponent,
    WinningPageComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule
  ]
})
export class GameModule { }
