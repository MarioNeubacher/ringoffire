import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
    setInterval(() => {
      this.checkLetter();
    }, 0.001);
  }

  checkLetter() {
    if (this.name.match(/[a-z]/i)) {
      this.letterCheck.playerNameContainsLetters = true;
    } else {
      this.letterCheck.playerNameContainsLetters = false;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
