import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nested-form-array',
  templateUrl: './nested-form-array.component.html',
  styleUrls: ['./nested-form-array.component.css']
})
export class NestedFormArrayComponent implements OnInit {

  public formDummyData = 
            {
              txtField:'Test',
              users: [{name:'akassh', phones:['9517532486','9517532684']},
                      {name:'jainwt', phones:['9517532412','9517532643']}]
            }

  public form: FormGroup;

  constructor(private fb: FormBuilder) 
  {
      this.form = fb.group({
          'txtTest': [],         
          'users': fb.array([]), //formArrayName="users"
      });
  }

  ngOnInit() {

      if (this.formDummyData) {
          this.form.patchValue({
            txtTest: this.formDummyData.txtField
          });
          this.formDummyData.users.forEach(userItem => {
              this.addUser(userItem);
          });
      } else {
          this.addUser();
      }
  }
 
  get users () {
    return this.form.get('users') as FormArray
  }
  
  //getUsers(form) {
  //  return form.controls.users.controls;
  //}

  addPhone(userIndex: number, phoneItem?: any) 
  {
      const phone = this.fb.group({ 
         'phone': [phoneItem?phoneItem:''],
      });
      (<FormArray>(<FormGroup>(<FormArray>this.users)
          .controls[userIndex]).controls['phones']).push(phone);
  
  }

  delPhone(userIndex: number, index: number) 
  {
      console.log('userIndex', userIndex, '-------', 'index', index);
      (<FormArray>(<FormGroup>(<FormArray>this.users)
          .controls[userIndex]).controls['phones']).removeAt(index);
  }

  addUser(userItem?: any) 
  {
      const user = this.fb.group({ 
        'name':[userItem?userItem.name:''], //[]
        'phones': this.fb.array([]),        //formArrayName="phones"
      });
      this.users.push(user);
    
      let userIndex = this.users.length-1;
      if (!userItem) {    //No Data:UserItem 
          this.addPhone(userIndex);
      } else {
          userItem.phones.forEach(phoneItem => {
              this.addPhone(userIndex, phoneItem);
          });
      }
  }

  delUser(index: number) {
      this.users.removeAt(index);
  }

  onCancle() {
      this.form.reset();
      console.log(this.form, this.form.value);
  }

  onSubmit(formValue) {
      console.log(JSON.stringify(formValue));
  }

  ngOnDestroy(): void {
  }



}
