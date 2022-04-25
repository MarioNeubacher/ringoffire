import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Game } from 'models/game';
import { GameserviceService } from '../gameservice.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {

  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'The player who drew the card must put their thumb on the table at a chosen time (before the next five gets picked though, or they lose the right). The last person to put their thumb on the table must drink.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'The player becomes the Quizmaster. He must clearly say for all to hear, "I am the Quizmaster!" Whoever answers one of his questions without putting "Mister Quizmaster" after the answer must finish his drink.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title = '';
  description = '';
  @Input() card: string;

  game: Game;

  constructor(public gameVariable: GameserviceService) { }

  /**
   * This function loads the functions in it when page loads
   */
  ngOnInit(): void {
    this.newGame();
  }

  /**
   * This function sets model/object to variable 
   */
  newGame() {
    this.game = new Game();
  }

  /**
   * This function gets triggered when a card is picked bc by defailt title is undefined and determines which title/description by the last number
   */
  ngOnChanges(): void { //void only functions, doesnt give true/false back
    if (this.card) { 
      console.log('Current card is:', this.card);
      let cardNumber = +this.card.split('_')[1]; //string gets number type when + at the beginning
      this.title = this.cardAction[cardNumber - 1].title; //-1 bc cards start at 1 and array always at 0
      this.description = this.cardAction[cardNumber - 1].description; //-1 bc cards start at 1 and array always at 0
    }
  }

}
