import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameserviceService {

  tooFewPlayers = false;
  playerNameContainsLetters = false;

  constructor() { }
}
