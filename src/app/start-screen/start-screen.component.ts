import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router) { } //private bc only use in ts file

  ngOnInit(): void {
  }

  newGame() {
    this.router.navigateByUrl('/game'); //path game in app routing module
  }

}
