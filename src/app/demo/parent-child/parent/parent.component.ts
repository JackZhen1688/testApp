import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { EditSliderComponet } from './edit-slider-component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent extends EditSliderComponet implements OnInit {  

  parentForm: FormGroup;

  isEditable: boolean = false; //<-- same name from parent editSlider
  parentData: any;             //<-- pass to Child
  childData: any;              //<-- get from Child 

  constructor(private formBuilder: FormBuilder) { 
    super();                   //<-- extends parent editSlider
    this.parentForm = this.formBuilder.group({
      txtParent: this.formBuilder.control(''),
      txtEdit: this.formBuilder.control(''),
    });
  }

  get txtEdit() {
    return this.parentForm.get('txtEdit');
  }

  //ngOnInit(): void {

  //}

  /*  
  <-- extends the same method from parent editSlider
  onToggleEdit(event: any) {
       console.log("onToggleEdit from parent component...")
        if (event.checked) {
            this.isEditable = true;
            ...
            ...
  }
  <-- over write the same method from parent editSlider
  onToggleEdit(event: any) {   
    console.log("over write onToggleEdit from children");
    super.onToggleEdit(event);
      console.log("Childre super.getEditabled()=="+super.getEditabled());
  }
  */

  // HTML <--[parentData] = "parentData" 
  passDataToChild() {  
    this.parentData = this.parentForm.get("txtParent").value;
  }

  //HTML <--(newDataEvent) = "getDataFromChild($event)"
  getDataFromChild(event: any) {
    this.childData = event
  }

  onSubmit() {
    console.log("children onSubmit()...");
  }

}
