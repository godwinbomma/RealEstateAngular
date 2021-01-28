import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApprovalListDetailComponent } from './manage-approval-list-detail.component';

describe('ManageApprovalListDetailComponent', () => {
  let component: ManageApprovalListDetailComponent;
  let fixture: ComponentFixture<ManageApprovalListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageApprovalListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageApprovalListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
