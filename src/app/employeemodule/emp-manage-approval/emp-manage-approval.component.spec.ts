import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpManageApprovalComponent } from './emp-manage-approval.component';

describe('EmpManageApprovalComponent', () => {
  let component: EmpManageApprovalComponent;
  let fixture: ComponentFixture<EmpManageApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpManageApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpManageApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
