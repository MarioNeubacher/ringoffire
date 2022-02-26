import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name; //game.html gives variable name for player array with [name]="player"

  constructor() { }

  ngOnInit(): void {
  }

}
