import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeesAddDetailComponent } from './manage-employees-add-detail.component';

describe('ManageEmployeesAddDetailComponent', () => {
  let component: ManageEmployeesAddDetailComponent;
  let fixture: ComponentFixture<ManageEmployeesAddDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEmployeesAddDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEmployeesAddDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
