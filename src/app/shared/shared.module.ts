import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardBoardComponent } from './components/card-board/card-board.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TimerComponent } from './components/timer/timer.component';
import { BoardComponent } from './components/board/board.component';
import { UsersBarComponent } from './components/users-bar/users-bar.component';
import { CountDownComponent } from './components/count-down/count-down.component';



@NgModule({
  declarations: [
    CardBoardComponent,
    SideBarComponent,
    TimerComponent,
    BoardComponent,
    UsersBarComponent,
    CountDownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    CardBoardComponent,
    SideBarComponent,
    TimerComponent,
    BoardComponent,
    UsersBarComponent,
    CountDownComponent
  ]
})
export class SharedModule { }
