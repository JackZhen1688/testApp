import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @ViewChild('myForm') ngForm: NgForm;

  @Input() parentData: any;
  @Input() isEditable: boolean;
  @Output() newDataEvent = new EventEmitter<string>();

  test:string;
  @Input() set assign(value: string) {
    this.test = value;
    console.log("### Test: " + this.test);
  }

  childForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.childForm = this.formBuilder.group({
      txtChild: this.formBuilder.control({value:'', disabled: false}),
    });
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: any) {
    //console.log(this.isEditable+" ===## changes.isEditable=="+JSON.stringify(changes.isEditable))
    if (changes.isEditable ==undefined) 
        console.log("changes.isEditable ==undefined")
    if (changes.parentData ==undefined)
        console.log("changes.parentData ==undefined")

    if (changes.isEditable !=undefined) { 
      if (!changes.isEditable.currentValue) 
          this.childForm.get("txtChild").disable(); 
      else 
          this.childForm.get("txtChild").enable();
    } 
    if (changes.parentData !=undefined && changes.parentData.currentValue==='111')
        console.log("value=="+changes.parentData.currentValue)
  }

  //HTML <--(click)="appChild.passDataToParent()";
  passDataToParent() {
    this.newDataEvent.emit(JSON.stringify(this.childForm.value));
  }
  
  onSubmit() {

  }
  onClickSubmit() {
    console.log("value==="+JSON.stringify(this.ngForm.form.value));
  }
}
