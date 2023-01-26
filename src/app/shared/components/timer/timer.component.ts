import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  announcerData: Array<any> = [];
  lastResults: Array<string> = [];
  value: number = 0;
  letter: string = '';
  interval: any;
  letterGenerate$: Subject<string> = new Subject();
  random$: Subject<number> = new Subject();
  @Input() timerStatus$: Subject<boolean> = new Subject();
  @Output() dataEvent: EventEmitter<number> = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {
    this.timerStart();

  }

  /**
   * se suscribe al objeto timerStatus$ y se espera una respuesta booleana.
   * Si la respuesta es verdadera, se llama a la función startAnnouncer() y
   * se suscribe a los objetos random$ y letterGenerate$. Cada vez que se
   * recibe una respuesta del objeto random$, se actualiza el valor de la
   * variable value y se envía dicho valor a la función sendValue(). Cuando
   * se recibe una respuesta del objeto letterGenerate$, se actualiza la
   * variable letter y se guarda un resultado en una lista lastResults. Si
   * la respuesta del objeto timerStatus$ es falsa, se completan los objetos
   * timerStatus$, random$ y letterGenerate$ y se detiene el temporizador
   * utilizando clearInterval().
   */
  timerStart(): void {
    this.timerStatus$.subscribe({
      next: (response: boolean) => {
        if (response) {
          this.startAnnouncer();

          this.random$.subscribe({
            next: (response: number) => {
              this.value = response;
              this.sendValue(response);
            }
          })

          this.letterGenerate$.subscribe({
            next: (response: string) => {
              this.letter = response;

              let result = `${this.letter}-${this.value}`;
              if (this.lastResults.length < 5) {
                this.lastResults.push(result);
              } else if (this.lastResults.length == 5) {
                this.lastResults.shift();
                this.lastResults.push(result);
              }
            }
          })
        } else {
          this.timerStatus$.complete;
          this.random$.complete;
          this.letterGenerate$.complete;
          clearInterval(this.interval);
        }
      }
    });
  }
  /**
   * La función inicia un intervalo que genera un número aleatorio, verifica
   * si el número ya está en la matriz de AnnouncerData y, si no lo está,
   * inserta el número en la matriz, emite el número al observable random$ y
   * emite una letra al observable letterGenerate$
   */

  startAnnouncer(): void {
    let num: number = 0;
    this.interval = setInterval(() => {
      num = this.generateRandomNumber();

      if (!this.announcerData.includes(num) && this.announcerData.length < 75) {
        this.announcerData.push(num);
        this.random$.next(num);

        if (num <= 15) {
          this.letterGenerate$.next('B');
        }
        else if (num > 15 && num <= 30) {
          this.letterGenerate$.next('I');
        }
        else if (num > 30 && num <= 45) {
          this.letterGenerate$.next('N');
        }
        else if (num > 45 && num <= 60) {
          this.letterGenerate$.next('G');
        }
        else if (num > 60 && num <= 75) {
          this.letterGenerate$.next('O');
        }

      } else if (this.announcerData.length == 74) {
        this.timerStatus$.next(false);
      }

    }, 7500)
  }


  /**
   * Genera un número aleatorio entre 1 y 75
   * @returns Un número aleatorio entre 1 y 75.
   */
  generateRandomNumber(): number {
    return Math.floor((Math.random() * 75 - 1 + 1) + 1);
  }

  /**
   * La función toma un número como argumento y emite ese número como un valor
   * @param {number} value - número: el valor que se enviará al componente principal
   */
  sendValue(value: number): void {
    this.dataEvent.emit(value);
  }
}
