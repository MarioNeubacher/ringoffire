import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameserviceService {

  tooFewPlayers = false;
  playerNameContainsLetters = false;
  soundMute = false;
  public currentPlayer: number = 0;

  gameId: string;
  game: Game; //variable works if strict set to false in tsconfig.json

  name: string = '';
  animal: string = '';

  avatars = ['cat.png', 'duck.png', 'rabbit.png', 'pig.png', 'elephant.png', 'sheep.png', 'teddy.png', 'unicorn.png'];

  constructor(
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  /**
   * This function sets model/object as a variable (OOP)
   */
   newGame() {
    this.game = new Game();
  }

  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJSON());
  }
}