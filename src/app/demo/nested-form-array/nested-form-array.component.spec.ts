import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedFormArrayComponent } from './nested-form-array.component';

describe('NestedFormArrayComponent', () => {
  let component: NestedFormArrayComponent;
  let fixture: ComponentFixture<NestedFormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestedFormArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
