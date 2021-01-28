import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpApprovalListDetailComponent } from './emp-approval-list-detail.component';

describe('EmpApprovalListDetailComponent', () => {
  let component: EmpApprovalListDetailComponent;
  let fixture: ComponentFixture<EmpApprovalListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpApprovalListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpApprovalListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
