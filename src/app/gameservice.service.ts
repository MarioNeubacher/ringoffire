import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameserviceService {

  tooFewPlayers = false;
  playerNameContainsLetters = false;
  soundMute = false;
  public currentPlayer: number = 0;

  constructor() { }

  ngOnInit() {
  }
}
