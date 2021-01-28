import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApprovalListComponent } from './manage-approval-list.component';

describe('ManageApprovalListComponent', () => {
  let component: ManageApprovalListComponent;
  let fixture: ComponentFixture<ManageApprovalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageApprovalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
