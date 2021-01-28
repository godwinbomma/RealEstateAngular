import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTemplateFieldsComponent } from './emp-template-fields.component';

describe('EmpTemplateFieldsComponent', () => {
  let component: EmpTemplateFieldsComponent;
  let fixture: ComponentFixture<EmpTemplateFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpTemplateFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpTemplateFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
