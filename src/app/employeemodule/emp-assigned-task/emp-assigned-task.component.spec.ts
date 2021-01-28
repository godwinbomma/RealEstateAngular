import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAssignedTaskComponent } from './emp-assigned-task.component';

describe('EmpAssignedTaskComponent', () => {
  let component: EmpAssignedTaskComponent;
  let fixture: ComponentFixture<EmpAssignedTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpAssignedTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpAssignedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
