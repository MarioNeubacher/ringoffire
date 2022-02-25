import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';
  game: Game; //variable works if strict set to false in tsconfig.json

  constructor() { }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game); 
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    this.currentCard = this.game.stack.pop(); //pop takes last value of array and deletes it
    console.log(this.currentCard);
    this.pickCardAnimation = true;
  }

}
