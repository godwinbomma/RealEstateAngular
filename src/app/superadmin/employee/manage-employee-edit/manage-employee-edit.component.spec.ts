import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeEditComponent } from './manage-employee-edit.component';

describe('ManageEmployeeEditComponent', () => {
  let component: ManageEmployeeEditComponent;
  let fixture: ComponentFixture<ManageEmployeeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEmployeeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEmployeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
