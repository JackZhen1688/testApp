import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

export interface TestInterFace {
  caseId: string; 
  docNum: string;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  id: string = '333';
  panelOpenState = false;
  caseHeaderData: any = {};
  caseInfoData: any = {};
  tttCaseNicknameNm:string ="abc";
  testInterface: any;//TestInterFace;
 
  panel2Expand: boolean = true;

  editToggle: boolean = false;

  panelForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.caseHeaderData['test1'] = 'Testing111111';  
    this.caseHeaderData['test2'] = 'Testing222222';
    this.testInterface = Object.assign(
      this.id,
      {
        caseId: '11111-111',
        docNum: '222222222',
        test: 'test'
      });  
    this.panelForm = this.formBuilder.group({
      txtTest1: this.formBuilder.control(''),
      txtTest2: this.formBuilder.control(''),
    });  

    this.caseInfoData['first_name']='jack'   //{"first_name":"jack"}
    this.caseInfoData['zhen_name']='zhen'    //"first_name":"jack","zhen_name":"zhen"
  }

  ngOnInit(): void {
    console.log(this.caseHeaderData['test1']+"==## Equals ##=="+JSON.stringify(this.caseHeaderData.test1));
    console.log("caseInfoData===####=="+JSON.stringify(this.caseInfoData));
    console.log("@@@@=="+JSON.stringify(this.testInterface));
    var myJson = { name: "mamad", family: "mirzaei" }
    let x = { ...myJson, "test":"testing"};
    console.log("XXXX==="+JSON.stringify(x))

    this.switchTest("Line");

  }

  test() {
    console.log("Hello")
    this.caseInfoData['case_NICKNAME_NM']='jack'
  }

  setChangedCM() {
    console.log("caseInfoData=="+JSON.stringify(this.caseInfoData))
  }

  changeData(){
    this.caseHeaderData['test2'] = 'TestingChanged';
    console.log("$$$$$=="+JSON.stringify(this.caseHeaderData.test2));
  }

  closePanel() {
    this.panel2Expand = false;
  }

  onSubmit() {
    console.log("form value===="+JSON.stringify(this.panelForm.value))
  }
  switchTest(pNewBreadcrumbName: string) {
    switch (pNewBreadcrumbName) {
      case 'Case Detail' :{
        console.log("111111111111111111==="+pNewBreadcrumbName)
        break;
      }
      case 'CustomerRequest': {
        console.log("222222222222222222==="+pNewBreadcrumbName)
      }
      case 'Congressional Notification' : {
        console.log("3333333333==="+pNewBreadcrumbName)
        break; 
      }  
      case 'Remarks':{
        console.log("4444444444==="+pNewBreadcrumbName)
      }
      case 'Line':{
        console.log("5555555555==="+pNewBreadcrumbName)
      }
      case 'Attachment':{
        console.log("6666666666==="+pNewBreadcrumbName)
      }
      case 'Note': {
        console.log("777777==="+pNewBreadcrumbName)
        break;
      }
    }
  }

  public show:boolean = false;
  public buttonName:any = 'Show';
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  objectKeys = Object.keys;

  my_menu = {
    'main1': ['sub1', 'sub2'],
    'main2': [{label:'sub1', action:'test1()', disabled: this.show}, {label:'sub2', action:'test2', disabled: !this.show}, {label:'sub3', action:'test3', disabled: this.show}],
  };

  getAction(action: string) {
    if (action==='test1()')
        this.test1();

    console.log("### this[action]=="+this[action])
  }
  test1(){
    alert("helll---111")
  }
  test2(){
    alert("helll--222")
  }
  test3(){
    alert("helll--333")
  }


}
