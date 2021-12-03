import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, COMPOSITION_BUFFER_MODE} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
 
  isShowTrainingBilling: boolean = true;
  isShowTrainingFunding: boolean = true;
  groups: string[] =["dsams-group","111", "Billing", "ABC"];
  menus: any[] = [{"serviceId":"A", "groupName":"Case","menuName":"Case"}, 
                  {"serviceId":"A", "groupName":"Billing","menuName":"Training Billing"},{"serviceId":"A","groupName":"Funding", "menuName":"Training Funding"}];
  data = {
          name:'Jack',
          amount:'233045',
          Comps: [{stratifiedAm:'$1020256.23', fundedAm:'$57892.50', obligatedAm:'$6489244.96', paidAm:'$5894233.00', billFY:'2020', collectAcctNm:'1456421'},
                  {stratifiedAm:'$82s5256.96', fundedAm:'$23592.45', obligatedAm:'$8349244.61', paidAm:'$2232233.15', billFY:'2021', collectAcctNm:'5642122'}]
         }
          
  keepGoing: boolean = true;
  map = new Map();
   
  isEditing = false;
  testForm: FormGroup;

  constructor(private formBuilder: FormBuilder) 
  { 
    this.map.set("Billing","isShowTrainingBilling");
    this.map.set("Funding","isShowTrainingFunding");
  }

  ngOnInit(): void {

    this.constructTestForm();
    this.breakLoop();
    this.patchData(this.data);

    const obj = { a: 1 };
    const copy = Object.assign({}, obj);
    console.log(JSON.stringify(copy));
  }

  constructTestForm() {
    this.testForm = this.formBuilder.group({
      name: [{ value: '', disabled: !this.isEditing }],
      amount:'',
      COMPs: this.initCOMPs(),
    });
  }
  
  breakLoop() {
    this.groups.forEach(group => {
      if(this.keepGoing) {
        for(let i = 0; i < this.menus.length; i++) {
          if (this.menus[i].serviceId=="A" && this.menus[i].groupName== group){
              console.log("menu name=="+ this.menus[i].menuName+"*** grou name=="+this.map.get(this.menus[i].groupName));
              this[this.map.get(this.menus[i].groupName)]=false
              //this.isShowTrainingBilling = false;             
              this.keepGoing = false;
              break;
          } else {
              this.isShowTrainingBilling = true;
          }
        }
      }
    });
  }

  get COMPs(): FormArray {
    return this.testForm.get('COMPs') as FormArray;
  }

  patchData(data: any) {
    this.COMPs.clear();
    this.testForm.patchValue({
      name: data.name,
      amount: data.amount,
    });
    data.Comps.forEach(compItem => {
      console.log("compItem==="+JSON.stringify(compItem));
      this.addComp(compItem);      
    });
  }

  initCOMPs() {
    var formArray = this.formBuilder.array([]);
        formArray.push(this.formBuilder.group({
          txtStratifiedAm: '',
          txtFundedAm: '',
          txtObligatedAm: '',
          txtPaidAm: '',
          txtBillFY: '',
          txtCollectAcctNm: ''
        }));
    return formArray;
  }

  addComp(compItem: any) 
  {
    const comp = this.formBuilder.group({ 
      'txtStratifiedAm': compItem.stratifiedAm,
      'txtFundedAm': compItem.fundedAm,
      'txtObligatedAm': compItem.obligatedAm,
      'txtPaidAm': compItem.paidAm,
      'txtBillFY': compItem.billFY,
      'txtCollectAcctNm': compItem.collectAcctNm,
    });
    this.COMPs.push(comp);
  }


}
