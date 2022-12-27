import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MattableReactiveFormComponent } from './mattable-reactive-form.component';

describe('MattableReactiveFormComponent', () => {
  let component: MattableReactiveFormComponent;
  let fixture: ComponentFixture<MattableReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MattableReactiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MattableReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
