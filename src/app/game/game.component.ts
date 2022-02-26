import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';
  game: Game; //variable works if strict set to false in tsconfig.json

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) { 
      this.currentCard = this.game.stack.pop(); //pop takes last value of array and deletes it
      this.pickCardAnimation = true; //not possible to take card until timeout
      console.log('New card' + this.currentCard);
      console.log('Game is', this.game);

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard); //game.html *ngFor="let card of game.playedCards"
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}