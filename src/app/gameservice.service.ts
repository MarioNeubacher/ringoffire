import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameserviceService {

  tooFewPlayers = false;
  playerNameContainsLetters = false;
  soundMute = false;

  constructor() { }

  ngOnInit() {
  }
}
