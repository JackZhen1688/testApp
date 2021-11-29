import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ShareService } from './../../services/share.service';
import { EditSliderComponent } from './edit-slider';  
import { Page } from './../../services/interface-page';

@Component({
  selector: 'app-inherit-class',
  templateUrl: './inherit-class.component.html',
  styleUrls: ['./inherit-class.component.css']
})
export class InheritClassComponent extends EditSliderComponent implements OnInit {

  checked: boolean = false;
  inheritForm: FormGroup;

  constructor(public dataService: ShareService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) 
  { 
    super(dataService, dialog);
    this.inheritForm = this.formBuilder.group({
      'txtTest': this.formBuilder.control(''),
    });
  }

  ngOnInit(): void {
    this.onEditChange();
  }

  onEditChange() {
    this.dataService.changedVar.subscribe((page: Page)  => {
      if (page.csuname==='WP128'&& page.changed) {
          if (this.isEditable) {
              this.checked = true;
              console.log("setLock...action")
          }else{
              this.checked = false;
              console.log("checkFromChanged....action=="+this.checkFromChanges())  
              if (this.checkFromChanges()) {
                  this.callValueChangedPopup();
              } else {
                  console.log("form....No changed (unlock)")
              }
              
          }
      }
    });
  }
  checkFromChanges(){
    if (this.inheritForm.dirty) {
        console.log("checkFromChanges....");
        return true;
    } else {
        return false;
    }
  }

  async callValueChangedPopup() {
    this.getPopupResults();
    await this.waitFor(3000);
    if (this.result == 0) {  //cancle
        console.log("Cancel....setTogleBack")
        this.checked = true;
        this.isEditable = true;
    }
    if (this.result == 1) {  //save
        console.log("Save....reloadData");
        this.checked = true;
        this.isEditable = true; 
    }
    if (this.result == 2) {  //continue
        console.log("Continue...reloadData/unLock");
        this.isEditable = false;
    }

  }

  waitFor(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) )
  }
  
  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
         resolve("I promise to return after one second!");
      }, 5000);
    });
  }

  async asyncMethod() {
    console.log("befor this.resut=="+this.result);
    const value = await this.getPopupResults();
    //const value = await this.waitForOneSecond();
    console.log("value==="+value);
    console.log("after this.resut=="+this.result);
  }


}
