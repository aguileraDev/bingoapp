import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winning-page',
  templateUrl: './winning-page.component.html',
  styleUrls: ['./winning-page.component.css']
})
export class WinningPageComponent implements OnInit {

  background: string = 'assets/images/trophy.png';

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
