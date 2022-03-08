import { Component, Input, OnInit } from '@angular/core';
import { GameserviceService } from '../gameservice.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name; //game.html gives variable name for player array with [name]="player"
  @Input() playerActive:boolean = false; //from game.html to player.html

  constructor(public gameVariable: GameserviceService) { }

  ngOnInit(): void {
  }

}
