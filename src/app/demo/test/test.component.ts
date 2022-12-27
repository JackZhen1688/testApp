import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyPipe, formatDate } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormControl, COMPOSITION_BUFFER_MODE} from '@angular/forms';
import { RestfulService } from './.././../services/restful.service'

export interface FundingDocument {
  userCaseId: string; 
  userCaseLineNumberId: string;
  documentNumber: string;
  fundingControlTypeId: string;
  startFiscalYearId: string;
}
interface Options {
  value: string;
  viewValue: string;
  extra: string;
}

interface OptionGroup {
  disabled?: boolean;
  name: string;
  options: Options[];
}
/*
const ELEMENT_DATA: FundingDocument[] = [
  {"userCaseId":"SRBOOO", "userCaseLineNumberId":"001", "documentNumber":"GCC98BC9SROO01", "fundingControlTypeId":"AFTUITION", "startFiscalYearId":"2021"},
  {"userCaseId":"ADDDDD", "userCaseLineNumberId":"002", "documentNumber":"5GCC98BC9SROO2", "fundingControlTypeId":"AFTUITION", "startFiscalYearId":"2020"}
]*/
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
          amount:'233045.12',
          Comps: [{stratifiedAm:'$1020256.23', fundedAm:'$57892.50', obligatedAm:'$6489244.96', paidAm:'$5894233.00', billFY:'2020', collectAcctNm:'1456421'},
                  {stratifiedAm:'$82s5256.96', fundedAm:'$23592.45', obligatedAm:'$8349244.61', paidAm:'$2232233.15', billFY:'2021', collectAcctNm:'5642122'}]
         }
          
  keepGoing: boolean = true;
  map = new Map();
   
  isEditing = false;
  testForm: FormGroup;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  selectedRow: FundingDocument;
  displayColumnsFD: string[] = ['userCaseId', 'userCaseLineNumberId', 'popOver']; 
  //displayColumnsFD: string[] = ['userCaseId', 'userCaseLineNumberId', 'documentNumber', 'fundingControlTypeId', 'startFiscalYearId', 'passAll', 'failAll']; 
  dsFundingDocs = new MatTableDataSource<FundingDocument>();
  
  fundingDocuments = [
    {"userCaseId":"SRBOOO", "userCaseLineNumberId":"001", "documentNumber":"GCC98BC9SROO01", "fundingControlTypeId":"AFTUITION", "startFiscalYearId":"2021"},
    {"userCaseId":"ADDDDD", "userCaseLineNumberId":"002", "documentNumber":"5GCC98BC9SROO2", "fundingControlTypeId":"AFTUITION", "startFiscalYearId":"2020"}
  ]

  set2 = "jack.zhen@mail.mil";   // Unescaped Characters
  info = {"serviceId":"C"};

  clients = [
    { id : 'id1', clientName: 'Bruce'},
    { id : 'id2', clientName: 'Ben12323423 4234234234234 234234234234 234234234234234 23423423423423423423423'},
    { id : 'id3', clientName: 'Peter'}
  ];
  
  selected = "non";
  optionGroups: OptionGroup[] = [
    {
      name: 'Validate Lease',
      options: [
        {value: 'VALID-VL', viewValue: 'Validate Lease', extra:'111ex'},
      ],
    },
    {
      name: 'DFAS',
      options: [
        {value: 'DFAS-CC', viewValue: 'Cancellation Coordination', extra:'222ex'},
      ],
    }
  ];
  constructor(private currencyPipe : CurrencyPipe,
              private restService: RestfulService,
              private formBuilder: FormBuilder) 
  { 
    this.map.set("Billing","isShowTrainingBilling");
    this.map.set("Funding","isShowTrainingFunding");
  }
  
  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
    alert("Hello")
    event.preventDefault();
    event.returnValue = false;
  
 }
 tabWasClosed:boolean;

 doBeforeUnload() {
  if (document.visibilityState === 'hidden') {
    this.tabWasClosed = true;
  }

  return false;
}

doUnload() {
  //if (this.tabWasClosed) {
    window.open("https://www.google.com/", "_blank");
  //}
}


strURL:string = "/back/ /home";

setData: string[] = ['Jack','Zhen','Jack','John'];

  ngOnInit(): void {

  console.log("random number=="+this.getRandomNumber(10000));

  let t = new Date('0222-01-01T04:56:02.000Z');
  console.log(formatDate(t.valueOf(), 'yyyy/MM/dd', 'en')+"date valid=="+ !isNaN(t.valueOf()));
  console.log("year=="+  t.getFullYear());
  console.log("month=="+  t.getMonth());//getDate()

  this.setData.push('Zhen');
  var duplicates = this.setData.reduce(function(acc, el, i, arr) {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
  }, []);
  console.log("dup==="+duplicates);

    console.log("str==="+this.strURL);
    this.test(this.info);
    console.log("this.info==="+this.info.serviceId);

    this.constructTestForm();
    this.breakLoop();
    this.patchData(this.data);

    const obj = { a: 1 };
    const copy = Object.assign({}, obj);
    console.log(JSON.stringify(copy));

    this.dsFundingDocs.sort = this.sort;
    this.dsFundingDocs.data = this.fundingDocuments;

  }

  get txtOption() {
    return this.testForm.get('txtOption');
  }
  get txtDate() {
    return this.testForm.get('txtDate');
  }
  getRandomNumber(pRange: number): number {
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);
    return Math.floor(byteArray[0] % pRange);
  }

  test(info:any) {
    console.log("before=="+info.serviceId)
    info.serviceId = 'A';
    console.log("after=="+info.serviceId)
  }
  constructTestForm() {
    this.testForm = this.formBuilder.group({
      name: [{ value: '', disabled: !this.isEditing }],
      amount:'',
      txtDate: new Date(),
      txtJobType: this.formBuilder.control('id1'),
      txtOption: this.formBuilder.control('A'),
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
      //console.log("compItem==="+JSON.stringify(compItem));
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

  getObjectWithoutDollarSignNameAndFunctions(obj){

    var keys = Object.keys(obj).filter(function(key){
      return typeof obj[key] !== 'function' && key.indexOf('$') !== 0;
    });
  
    return keys.map(function(key){ return obj[key] });    
  }
  
  onSubmit() {
    console.log("this.testForm.dirty=="+this.testForm.dirty)
    this.restService.postData(this.strURL, null)
    .subscribe(            
      data => { 

      });
    console.log("formValue=="+JSON.stringify(this.getObjectWithoutDollarSignNameAndFunctions(this.testForm.value)))
  }

  clearForm() {
    this.testForm.markAsPristine();
    this.testForm.markAsUntouched();

  }
  methodName:string = "optionAct";
  onChange() {
    let tmp:string = 'A';
    let tmps:string[] = tmp.split(' ');
    console.log("#####===tmps[0]"+tmps[0]+" tmps[1]="+tmps[1])
    if (tmps[1] ===undefined)
        tmps[1] = null;
    console.log("@@@@ tmps[1]=="+tmps[1])
    let opts:string[] = (this.txtOption.value).split('@')
    console.log("opts[0]=="+opts[0]+" opts[1]="+opts[1])
    
    switch (opts[0]) {
      case 'VALID-VL': {
        alert("call method(): validation release");
        break;
      }
      case 'DFAS-CC': {
        //alert("call method(): validation release");
        this.optionAct();
        //this[this.methodName+'('+')'];
        console.log("this[this.methodName]=="+this[this.methodName])
        break;
      }
    }
  }

  optionAct() {
    alert("hello");
  }

  validDate(date:string) {
    console.log(date+"==date=="+new Date(date))
    //console.log((new Date(date) !== "Invalid Date") && !isNaN(new Date(date));

  }
}
