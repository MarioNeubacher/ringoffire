import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { GameserviceService } from '../gameservice.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  playerName: string;
  avatar: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name; //game.html gives variable name for player array with [name]="player"
  @Input() playerActive: boolean = false; //from game.html to player.html
  @Input() player: any;
  @Input() game: Game;

  constructor(
    public gameVariable: GameserviceService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {  this.player = data; }

  ngOnInit(): void {
  }
}
