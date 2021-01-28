import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpForgotPasswordComponent } from './emp-forgot-password.component';

describe('EmpForgotPasswordComponent', () => {
  let component: EmpForgotPasswordComponent;
  let fixture: ComponentFixture<EmpForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
