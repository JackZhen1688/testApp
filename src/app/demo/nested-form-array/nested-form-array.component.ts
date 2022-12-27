import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core'

interface Pokemon {
    value: string;
    viewValue: string;
  }
  
  interface PokemonGroup {
    disabled?: boolean;
    name: string;
    pokemon: Pokemon[];
  }

  
@Component({
  selector: 'app-nested-form-array',
  templateUrl: './nested-form-array.component.html',
  styleUrls: ['./nested-form-array.component.css']
})

export class NestedFormArrayComponent implements OnInit {
  
  pokemonGroups: PokemonGroup[] = [
    {
      name: 'Grass',
      disabled: false,
      pokemon: [
        {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
        {value: 'oddish-1', viewValue: 'Oddish'},
        {value: 'bellsprout-2', viewValue: 'Bellsprout'},
      ],
    },
    {
      name: 'Water',
      disabled: true,
      pokemon: [
        {value: 'squirtle-3', viewValue: 'Squirtle'},
        {value: 'psyduck-4', viewValue: 'Psyduck'},
        {value: 'horsea-5', viewValue: 'Horsea'},
      ],
    }
  ]
  pokemonGroups1: PokemonGroup[] = [
    {
      name: 'Grass',
      disabled: false,
      pokemon: [
        {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
        {value: 'oddish-1', viewValue: 'Oddish'},
        {value: 'bellsprout-2', viewValue: 'Bellsprout'},
      ],
    },
    {
      name: 'Water',
      disabled: true,
      pokemon: [
        {value: 'squirtle-3', viewValue: 'Squirtle'},
        {value: 'psyduck-4', viewValue: 'Psyduck'},
        {value: 'horsea-5', viewValue: 'Horsea'},
      ],
    }
  ]

  public formDummyData = 
            {
              txtField:'Test',
              users: [{name:'akassh', phones:['9517532486','9517532684']},
                      {name:'jainwt', phones:['9517532412','9517532643']}]
            }

  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private readonly changeDetectorRef: ChangeDetectorRef) 
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
 
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
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

  addUserFlag: boolean = false;
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
          this.addUserFlag = true;
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

  togglePanel(index: number) {
    console.log("index===="+index)
  }

  test() {
      alert("hello")
  }

  activeClassIndex: number;
  activeToggler(selectedIndex) {
    this.activeClassIndex = (this.activeClassIndex == selectedIndex) ? null : selectedIndex;
   }
}
