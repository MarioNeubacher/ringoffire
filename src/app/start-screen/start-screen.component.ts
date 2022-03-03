import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(public router: Router) { } 

  ngOnInit(): void {
    new Audio('assets/audio/music.mp3').play();
  }

  newGame() {
    this.router.navigateByUrl('/game'); //path game in app routing module
  }

}
