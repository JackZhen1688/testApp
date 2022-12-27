import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-mattable-reactive-form',
  templateUrl: './mattable-reactive-form.component.html',
  styleUrls: ['./mattable-reactive-form.component.css']
})
export class MattableReactiveFormComponent implements OnInit {

  data: any[] = [ { from: "1111", to: "22222", details:[{address:'NJ', phone:'1122'},{address:'NY', phone:'2211'}] } ];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['from', 'to'];
  rows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({ 'dates': this.rows });

  displaySubColumns = ['address', 'phone'];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.data.forEach((d) => this.addRow(d));
    this.updateView();
  }

  emptyTable() {
    while (this.rows.length !== 0) {
      this.rows.removeAt(0);
    }
  }

  addRow(d?: any) {
    const row = this.fb.group({
      'from'   : [d && d.from ? d.from : null, []],
      'to'     : [d && d.to   ? d.to   : null, []],
      'details': this.fb.array([]),  
    });
    this.rows.push(row); 
    let userIndex = this.rows.length-1;
    d.details.forEach(dItem => {
      this.addPhone(userIndex, dItem);
    });

    this.updateView(); 
  }

  addPhone(userIndex: number, detail?: any) 
  {
      const detai = this.fb.group({ 
         'address':[detail?detail.address:''],
         'phone': [detail?detail.phone:''],
      });
      (<FormArray>(<FormGroup>(<FormArray>this.rows)
          .controls[userIndex]).controls['details']).push(detai);   
  }

  removeRow(index: number) {
    this.rows.removeAt(index);
    this.updateView(); 
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
    console.log("######")
  }

  onSubmit() {
    console.log("form value=="+JSON.stringify(this.form.value))
  }
}
