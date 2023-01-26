import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-losing-page',
  templateUrl: './losing-page.component.html',
  styleUrls: ['./losing-page.component.css']
})
export class LosingPageComponent implements OnInit {

  background: string = 'assets/images/game-over.png';

  constructor(
    private router: Router
  ){

  }
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/lobby']);
    },5000)
  }
}
