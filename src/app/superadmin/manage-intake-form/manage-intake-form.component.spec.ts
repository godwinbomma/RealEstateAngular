import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIntakeFormComponent } from './manage-intake-form.component';

describe('ManageIntakeFormComponent', () => {
  let component: ManageIntakeFormComponent;
  let fixture: ComponentFixture<ManageIntakeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageIntakeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIntakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
