import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameserviceService } from '../gameservice.service';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

  avatars = ['cat.png', 'duck.png', 'rabbit.png', 'pig.png', 'elephant.png', 'sheep.png', 'teddy.png', 'unicorn.png'];

  selectedIndex = -1;
  form: FormGroup;

  standardAvatar = this.avatars[0];

  constructor(
    public dialogRef: MatDialogRef<DialogAddPlayerComponent>, 
    public letterCheck: GameserviceService,
    public gameVariable: GameserviceService,
    private formBuilder: FormBuilder
    ) { 
      this.form = this.formBuilder.group({ playerName: '', avatar: this.standardAvatar })
    }

  ngOnInit(): void {
  }

  /**
   * This function doesnt allow empty space 
   */
  filterInput() {
    if (this.gameVariable.name.match(/[a-z]/i)) {
      this.letterCheck.playerNameContainsLetters = true;
    } else {
      this.letterCheck.playerNameContainsLetters = false;
    }
  }

  /**
   * This click function closes the dialog for adding players
   */
  onNoClick() {
    this.dialogRef.close();
    this.gameVariable.name = '';
  }

  clickOk() {
    this.gameVariable.name = '';
  }

  selectProfilePicture(i) {
    this.selectedIndex = i;
  }

}
