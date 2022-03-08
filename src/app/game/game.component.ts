import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameserviceService } from '../gameservice.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  soundMute = false;
  gameMusic = new Audio('assets/audio/music.mp3');
  attentionSound = new Audio('assets/audio/attention.mp3');
  cardSound = new Audio('assets/audio/card.mp3');
  soundOrNosound = 'sound';
  currentCard: string = '';
  game: Game; //variable works if strict set to false in tsconfig.json

  constructor(public dialog: MatDialog, public gameVariable: GameserviceService) { }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
    this.gameMusic.play();
  }

  newGame() {
    this.game = new Game();
  }

  sound() {
    if (this.gameVariable.soundMute == false) { //turn off
      this.gameMusic.volume = 0;
      this.attentionSound.volume = 0;
      this.cardSound.volume = 0;
      this.soundOrNosound = 'nosound';
      this.gameVariable.soundMute = true;
    } else { //turn on
      this.gameMusic.volume = 1;
      this.attentionSound.volume = 1;
      this.cardSound.volume = 1;
      this.soundOrNosound = 'sound';
      this.gameVariable.soundMute = false;
    }
  }

  showAllPlayers() {
    document.getElementById('id-allPlayers').classList.remove('allPlayers');
    document.getElementById('id-allPlayers').classList.add('allPlayers2');
    document.getElementById('id-dropDown').innerHTML = `
      <mat-icon (click)="hideAllPlayers()" class="drop-down">arrow_drop_down</mat-icon>
    `;
  }

  hideAllPlayers() {
    document.getElementById('id-allPlayers').classList.add('d-none');
  }

  takeCard() {
    if (this.game.players.length < 2) {
      this.gameVariable.tooFewPlayers = true; //gameservice, gameinfo 
      this.attentionSound.play();
      setTimeout(() => {
        this.gameVariable.tooFewPlayers = false;
      }, 1000);
    } else if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop(); //pop takes last value of array and deletes it
      this.pickCardAnimation = true; //not possible to take card until timeout
      /*  console.log('New card' + this.currentCard);
       console.log('Game is', this.game); */

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; //% modulu only counts until max length

     /*  if (this.game.currentPlayer > 0) { 
        let multiplicator = this.game.currentPlayer - 0;
        let elem = document.getElementById('id-playerScrollable');
        elem.scroll(0, 70 * multiplicator);
      } else {
        let elem = document.getElementById('id-playerScrollable');
        elem.scroll(0, 0);
      } */

      setTimeout(() => {
        this.cardSound.play();
      }, 200);

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard); //game.html *ngFor="let card of game.playedCards"
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  //angular material library 
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => { //
      if (name && name.length > 0) {
        this.game.players.push(name);
        document.getElementById('id-activePlayer').classList.remove('d-none');
      }
    });
  }
}