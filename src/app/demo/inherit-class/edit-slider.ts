
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ShareService } from './../../services/share.service';
import { DialogMessageYesnoComponent } from './../../utilitis/dialog-message-yesno/dialog-message-yesno.component';

@Component({
    template: ''
  })
export class EditSliderComponent {

  isEditable:boolean = false;
  result:number;

  constructor(public dataService: ShareService,
              public dialog: MatDialog) { }

  onToggleChange(event: any) {
    console.log(event.source.checked+" ===toggleChanged=="+event.checked)
    if (event.checked) {
        this.isEditable = true;
        this.dataService.changeVar("WP128", true);  //<--Dynamic (WP128) will get from getCSU_CD()
    } else {
        this.isEditable = false;
        console.log("isEditable=="+this.isEditable)
        this.dataService.changeVar("WP128", true)
    }      
  }

  getPopupResults() {   
    const timeout = 3000;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "550px"; 
    dialogConfig.data = {message: "You have unsaved changed. Would you like to save the changes\n or continue without saving?", indecator: 'Save'};
    const dialogRef = this.dialog.open(DialogMessageYesnoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.result = result
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout)
    })
  }

}