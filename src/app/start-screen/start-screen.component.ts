import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(public router: Router) { } 

  /**
   * This function sets path game in app routing module 
   */
  newGame() {
    this.router.navigateByUrl('/game'); 
  }

}
