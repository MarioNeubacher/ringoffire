import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/game';

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
  profilePic: string = '';

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