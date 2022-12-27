import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MattableExpandableComponent } from './mattable-expandable.component';

describe('MattableExpandableComponent', () => {
  let component: MattableExpandableComponent;
  let fixture: ComponentFixture<MattableExpandableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MattableExpandableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MattableExpandableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
