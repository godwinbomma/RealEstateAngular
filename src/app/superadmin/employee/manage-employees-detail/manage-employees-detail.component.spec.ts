import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeesDetailComponent } from './manage-employees-detail.component';

describe('ManageEmployeesDetailComponent', () => {
  let component: ManageEmployeesDetailComponent;
  let fixture: ComponentFixture<ManageEmployeesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEmployeesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEmployeesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
