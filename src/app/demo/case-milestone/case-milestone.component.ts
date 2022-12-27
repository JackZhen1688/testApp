import { Component, OnInit, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-case-milestone',
  templateUrl: './case-milestone.component.html',
  styleUrls: ['./case-milestone.component.css']
})
export class CaseMilestoneComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  isEditable: boolean = false;
  addMilestoneFlag: boolean = false;

  txtBorderBlack:string ="textarea-customize_editable";
  txtBborderGrey:string ="textarea-customize";
  dateBorderBlack = "date_container_editable";
  dateBorderGrey = "date_container";

  panelOpenState: boolean = false;

  public milestoneForm: FormGroup;

  constructor(@Inject(LOCALE_ID) public locale: string, 
              private formBuilder: FormBuilder) 
  { 
    this.milestoneForm = formBuilder.group({
      'milestones': formBuilder.array([]), 
    });
  }

  ngOnInit(): void {

    if (this.milestoneData) {
        this.milestoneData.milestones.forEach(milestone => {
          this.addMilestone(milestone);
        });
    } else {
        this.addMilestone();
    }

  }

  get milestones () {
    return this.milestoneForm.get('milestones') as FormArray
  }

  getActualDate_P(idx:number) {
    return this.milestones.controls[idx].get('txtPlannedDate_P');
  }

  addCommReason(milestonesIndex: number, commReason?: any) 
  {
      const comReason = this.formBuilder.group({ 
         'txtCode': [commReason?commReason.MILESTONE_REJECT_REASON_ID:''],
         'txtReason': [commReason?commReason.REJECT_TITLE_NM:''],
         'txtDaysProposed': [commReason?commReason.PROPOSED_DAYS_FOR_CDEF_QY:''],
         'txtDaysActual': [commReason?commReason.ACTUAL_DAYS_FOR_CDEF_QY:''],
         'txtComments': [commReason?commReason.CDEF_COMMENT_TX:''],
         'rejectReasons': this.patchRejectReason(commReason), 
      });
      (<FormArray>(<FormGroup>(<FormArray>this.milestones)
          .controls[milestonesIndex]).controls['commReasons']).push(comReason);   
  }

  patchRejectReason(commReason?: any) {
    var formArray = this.formBuilder.array([]);
    if (commReason) {
        commReason.rejectReasons.forEach(rejectReason => {
          formArray.push(this.formBuilder.group({
            txtRejectId: [rejectReason?rejectReason.MILESTONE_REJECT_REASON_ID:''],
            txtRejectNm: [rejectReason?rejectReason.REJECT_TITLE_NM:'']
          }));  
        });
    }
    return formArray;
  }

  delCommReason(milestonesIndex: number, index: number) 
  {
      (<FormArray>(<FormGroup>(<FormArray>this.milestones)
          .controls[milestonesIndex]).controls['commReasons']).removeAt(index);
  }

  addMilestone(milestone?: any) 
  {
      let milestoneDateA = null;
      let milestoneDateP="";
      if (milestone){
          if (milestone.CASE_VERSION_MILESTONE_DT_P != null)
              //milestoneDateP = formatDate(milestone.CASE_VERSION_MILESTONE_DT_P, 'yyyy-MM-dd', 'en-US');
              milestoneDateP = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
        
      }
     
      const user = this.formBuilder.group({ 
        'txtMilestoneId':[milestone?milestone.MILESTONE_ID:''],             
        'txtMilestoneName':[milestone?milestone.MILESTONE_TITLE_NM:''],             
        'txtMilestoneCategoryCd':[milestone?milestone.MILESTONE_CATEGORY_CD:''],             
        'txtActualDate_A':[milestoneDateA],             
        'txtPersonId_A':[milestone?milestone.USER_ID_A:''],             
        'txtPlannedDate_P':[milestoneDateP],             
        'txtPersonId_P':[milestone?milestone.USER_ID_P:''],             
        'txtRevisedDate_R':[milestone?formatDate(milestone.CASE_VERSION_MILESTONE_DT_R, 'yyyy-MM-dd', 'en'):''],             
        'txtPersonId_R':[milestone?milestone.USER_ID_R:''],  
        'txtOverideIn':[milestone?milestone.MILESTONE_OVERRIDE_IN:''],             
        'txtFirstOccurDate':[milestone?milestone.CREATE_DT:''],             
        'txtComments':[milestone?milestone.MILESTONE_DESCRIPTION_TX:''],             
        'txtPersonName_A':[milestone?milestone.PERSON_NM_A:''],             
        'txtPersonName_P':[milestone?milestone.PERSON_NM_P:''],             
        'txtPersonName_R':[milestone?milestone.PERSON_NM_R:''],             
        'txtActivityId_A':[milestone?milestone.ACTIVITY_ID_A:''],             
        'txtActivityId_P':[milestone?milestone.ACTIVITY_ID_P:''],     
        'txtActivityId_R':[milestone?milestone.ACTIVITY_ID_R:''],     

        'commReasons': this.formBuilder.array([]),       
      });
      this.milestones.push(user);
  
      let milestoneIndex = this.milestones.length-1;
      if (!milestone) {                                   
          this.addCommReason(milestoneIndex);
          this.addMilestoneFlag = true;
          this.step = milestoneIndex;

      } else {
          milestone.commReasons.forEach(commReason => {
              this.addCommReason(milestoneIndex, commReason);
          });
      }
  }

  delMilestone(index: number) {
      this.milestones.removeAt(index);
      this.addMilestoneFlag = false;
  }

  onSubmit() {
    console.log(JSON.stringify(this.milestoneForm.value));
  }


  getMilestoneId(milestoneId: string) {
    console.log(" milestoneId=="+milestoneId)
  }

  step;
  setPanel(index: number) {
    this.step = index;
  }

  //--------------------------------
  codeList: any = ['code 1','code 2','code 3'];
  milestoneData:any = 
  {
    CASE_ID: '282279',
    CASE_VERSION_ID: '559797',
    milestones: [
     {
      CASE_MILESTONE_ID: '3370658',
      CASE_MILESTONE_REVISION_ID: '3311383',
      MILESTONE_ID:'DOCINT',
      MILESTONE_TITLE_NM:'Document Initiolized',
      MILESTONE_CATEGORY_CD:'Prepare',
      CASE_VERSION_MILESTONE_DT_A:'2022-10-14 11:00:00',
      USER_ID_A:'720',
      CASE_VERSION_MILESTONE_DT_P:'2022-10-14 11:00:00',
      USER_ID_P:'1999',
      CASE_VERSION_MILESTONE_DT_R:null,
      USER_ID_R:'720',
      MILESTONE_OVERRIDE_IN:'',
      CREATE_DT:'6/23/2022',
      PERSON_NM_A:'Kerry Geist',
      ACTIVITY_ID_A:'DSCA',
      PERSON_NM_P:'Jennifer Hughes',
      ACTIVITY_ID_P:'DSCA',
      PERSON_NM_R:'Kerry Geist',
      ACTIVITY_ID_R:'DSCA',
      MILESTONE_DESCRIPTION_TX:'comments...111',
      commReasons:
      [{MILESTONE_REJECT_REASON_ID:'C01',
        REJECT_TITLE_NM:'reject name 1',
        PROPOSED_DAYS_FOR_CDEF_QY:'15',
        ACTUAL_DAYS_FOR_CDEF_QY:'60',
        CDEF_COMMENT_TX:'reject description 1',
        rejectReasons:
        [{MILESTONE_REJECT_REASON_ID: 'C01',
          REJECT_TITLE_NM: 'Pend recpt ctry sorc proc/just'
         },
         {MILESTONE_REJECT_REASON_ID: 'C02',
          REJECT_TITLE_NM: 'Customer request incomplete'
         },
         {MILESTONE_REJECT_REASON_ID: 'C03',
          REJECT_TITLE_NM: 'Hold placed,transp decision'
         }
        ]
       },
       {MILESTONE_REJECT_REASON_ID:'C02',
        REJECT_TITLE_NM:'reject name 11',
        PROPOSED_DAYS_FOR_CDEF_QY:'11',
        ACTUAL_DAYS_FOR_CDEF_QY:'31',
        CDEF_COMMENT_TX:'reject description 11',
        rejectReasons:
        [{MILESTONE_REJECT_REASON_ID: 'C01',
          REJECT_TITLE_NM: 'Pend recpt ctry sorc proc/just'
         },
         {MILESTONE_REJECT_REASON_ID: 'C02',
          REJECT_TITLE_NM: 'Customer request incomplete'
         },
         {MILESTONE_REJECT_REASON_ID: 'C03',
          REJECT_TITLE_NM: 'Hold placed,transp decision'
         }
        ]
       }   
      ]  
     },
     {
      CASE_MILESTONE_ID: '2058507',
      CASE_MILESTONE_REVISION_ID: '1934907',
      MILESTONE_ID:'MILAP',
      MILESTONE_TITLE_NM:'Mildep Approval',
      MILESTONE_CATEGORY_CD:'Approval',
      CASE_VERSION_MILESTONE_DT_A:'6/23/2022',
      USER_ID_A:'863',
      CASE_VERSION_MILESTONE_DT_P:'6/23/2022',
      USER_ID_P:'589',
      CASE_VERSION_MILESTONE_DT_R:'6/23/2022',
      USER_ID_R:'720',
      MILESTONE_OVERRIDE_IN:'',
      CREATE_DT:'6/23/2022',
      PERSON_NM_A:'Jesse Borden',
      ACTIVITY_ID_A:'DSCA',
      PERSON_NM_P:'Joe Tran',
      ACTIVITY_ID_P:'DSCA',
      PERSON_NM_R:'Bill William',
      ACTIVITY_ID_R:'DSCA',
      MILESTONE_DESCRIPTION_TX:'comments...222',
      commReasons:
      [{MILESTONE_REJECT_REASON_ID:'C03',
        REJECT_TITLE_NM:'reject name 2',
        PROPOSED_DAYS_FOR_CDEF_QY:'2',
        ACTUAL_DAYS_FOR_CDEF_QY:'41',
        CDEF_COMMENT_TX:'reject description 2',
        rejectReasons:
        [{MILESTONE_REJECT_REASON_ID: 'C01',
          REJECT_TITLE_NM: 'Pend recpt ctry sorc proc/just'
         },
         {MILESTONE_REJECT_REASON_ID: 'C02',
          REJECT_TITLE_NM: 'Customer request incomplete'
         },
         {MILESTONE_REJECT_REASON_ID: 'C03',
          REJECT_TITLE_NM: 'Hold placed,transp decision'
         }
        ]
        },
       {MILESTONE_REJECT_REASON_ID:'CO4',
        REJECT_TITLE_NM:'reject name 22',
        PROPOSED_DAYS_FOR_CDEF_QY:'22',
        ACTUAL_DAYS_FOR_CDEF_QY:'89',
        CDEF_COMMENT_TX:'reject description 22',
        rejectReasons:
        [{MILESTONE_REJECT_REASON_ID: 'C01',
          REJECT_TITLE_NM: 'Pend recpt ctry sorc proc/just'
         },
         {MILESTONE_REJECT_REASON_ID: 'C02',
          REJECT_TITLE_NM: 'Customer request incomplete'
         },
         {MILESTONE_REJECT_REASON_ID: 'C03',
          REJECT_TITLE_NM: 'Hold placed,transp decision'
         }
        ]
        }   
      ]  
     }
    ]
  } 
}
