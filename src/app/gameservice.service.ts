import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameserviceService implements OnInit {

  tooFewPlayers = false;
  playerNameContainsLetters = false;
  soundMute = false;
  gameMusic = new Audio('assets/audio/music.mp3');

  constructor() { }

  ngOnInit() {
    this.gameMusic.play();
  }
}
