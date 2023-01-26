import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit {

  minutes: number = 0;
  seconds: number = 0;
  @Output() finishCount$: EventEmitter<boolean> = new EventEmitter();

  constructor(){

  }

  ngOnInit():void {
      this.start()
  }

 /**
  * Estamos creando un nuevo objeto Fecha, añadiéndole 3 minutos y luego configurando un intervalo
  * para que se ejecute cada segundo.
  *
  * Cada segundo, estamos calculando la diferencia entre la hora actual y la hora que establecimos al
  * principio.
  *
  * Luego estamos usando el operador de módulo para obtener los minutos y segundos restantes.
  *
  * Finalmente, borramos el intervalo cuando el tiempo restante es inferior a 0.
  */
  start():void{

     const countDownDate = new Date().getTime() + (3 * 60 * 1000);

     const interval = setInterval(() => {
       const now = new Date().getTime();
       const remainingTime = countDownDate - now;

       this.minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
       this.seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);


      /* Borrar el intervalo y emite un evento para habilitar el boton "jugar" cuando se acabe el tiempo. */
       if (remainingTime < 0) {
         this.finishCount$.emit(true)
         clearInterval(interval);
         this.minutes = 0;
         this.seconds = 0;
       }
     }, 1000);
  }
}
