import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncMethodComponent } from './async-method.component';

describe('AsyncMethodComponent', () => {
  let component: AsyncMethodComponent;
  let fixture: ComponentFixture<AsyncMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
