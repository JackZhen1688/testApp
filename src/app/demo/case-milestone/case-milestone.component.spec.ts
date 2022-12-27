import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseMilestoneComponent } from './case-milestone.component';

describe('CaseMilestoneComponent', () => {
  let component: CaseMilestoneComponent;
  let fixture: ComponentFixture<CaseMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseMilestoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
