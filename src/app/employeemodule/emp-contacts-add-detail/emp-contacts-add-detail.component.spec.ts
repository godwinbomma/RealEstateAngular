import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpContactsAddDetailComponent } from './emp-contacts-add-detail.component';

describe('EmpContactsAddDetailComponent', () => {
  let component: EmpContactsAddDetailComponent;
  let fixture: ComponentFixture<EmpContactsAddDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpContactsAddDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpContactsAddDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
