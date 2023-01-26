import { Component, OnInit } from '@angular/core';
import { OnExit } from '@shared/guards/exit.guard';


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit, OnExit {
  exit: boolean = false;

  constructor(){

  }

  ngOnInit():void{

  }

 /**
  * La función getOnExit() es una función que toma un valor booleano y
  * establece el valor de la salida de la ruta
  * @param {boolean} event - booleano: este es el evento que se pasa desde
  * el componente app-board que viene desde el app-cardboard.
  */
  getOnExit(event: boolean): void{
    this.exit = event;
  }

  onExit():boolean {

    return this.exit?  this.exit: confirm("¿Seguro deseas salir del juego? se perdera todo el progreso");

  };
}
