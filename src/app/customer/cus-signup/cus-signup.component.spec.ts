import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusSignupComponent } from './cus-signup.component';

describe('CusSignupComponent', () => {
  let component: CusSignupComponent;
  let fixture: ComponentFixture<CusSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
