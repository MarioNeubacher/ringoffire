import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(
    private firestore: AngularFirestore,
    public router: Router
  ) { }

  /**
   * This function sets path game in app routing module 
   */
  newGame() {
    let game = new Game();
    this.firestore
      .collection('games')
      .add(game.toJSON())
      .then((gameInfo: any) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
  }
}
