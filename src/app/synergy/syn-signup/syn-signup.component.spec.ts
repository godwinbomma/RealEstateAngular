import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynSignupComponent } from './syn-signup.component';

describe('SynSignupComponent', () => {
  let component: SynSignupComponent;
  let fixture: ComponentFixture<SynSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
