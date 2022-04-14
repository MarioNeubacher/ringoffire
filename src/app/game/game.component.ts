import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameserviceService } from '../gameservice.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  showActivePlayer = false;
  togglePlayers = true;
  soundMute = false;
  gameMusic = new Audio('assets/audio/music.mp3');
  attentionSound = new Audio('assets/audio/attention.mp3');
  cardSound = new Audio('assets/audio/card.mp3');
  soundOrNosound = 'sound';
  game: Game; //variable works if strict set to false in tsconfig.json
  gameId: string;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public gameVariable: GameserviceService
  ) { }

  /**
   * This function loads the functions init when website loads
   */
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.gameId = params.id; //set URL globally as var gameId

      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
    });
    this.gameMusic.play();
  }

  /**
   * This function sets model/object as a variable (OOP)
   */
  newGame() {
    this.game = new Game();
  }

  /**
   * This function sets the sound
   */
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

  /**
   * This function sets variable 'togglePlayers' to true so *ngIf in html gets triggered to show all players 
   */
  toggleAllPlayers() {
    this.togglePlayers = !this.togglePlayers;
  }

  /**
   * This function plays animations to take a card from stack
   */
  takeCard() {
    if (this.game.players.length < 2) {
      this.gameVariable.tooFewPlayers = true; //gameservice, gameinfo 
      this.attentionSound.play();
      setTimeout(() => {
        this.gameVariable.tooFewPlayers = false;
      }, 1000);
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop(); //pop takes last value of array and deletes it
      this.saveGame();
      this.game.pickCardAnimation = true; //not possible to take card until timeout
      /*  console.log('New card' + this.currentCard);
       console.log('Game is', this.game); */

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; //% modulu only counts to max length

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
        this.game.playedCards.push(this.game.currentCard); //game.html *ngFor="let card of game.playedCards"
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  /**
   * This function is from angular material library to make the dialog for all players work
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => { //
      if (name && name.length > 0) {
        this.game.players.push(name);
        document.getElementById('id-activePlayer').classList.remove('d-none');
        this.saveGame(); 
      }
    });
  }

  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJSON());
  }
}