import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-mattable-expandable',
  templateUrl: './mattable-expandable.component.html',
  styleUrls: ['./mattable-expandable.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MattableExpandableComponent implements OnInit {

  dsFinancialHistory = new MatTableDataSource();
  displayedColumns: string[] = ['createDt','cycleControlId','img'];
  expandedElement: null;
  displaySubcolumns = ['fiscalYearId','account'];  


  ngOnInit(): void {

    this.dsFinancialHistory.data =[
      {
         "createDt":"2006-10-18",
         "cycleControlId":"8",
         "historySubList":[
            {
               "fiscalYearId":"2002",
               "account":"123"
            }
         ]
      }
   ]



  }

}

