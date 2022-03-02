import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { GameserviceService } from '../gameservice.service';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

  name: string = '';

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>, public letterCheck: GameserviceService) { }

  ngOnInit(): void {
    this.checkLetter();
  }

  checkLetter() {
    if (name.match(/[a-z]/i)) {
      this.letterCheck.playerNameContainsLetters = true;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
