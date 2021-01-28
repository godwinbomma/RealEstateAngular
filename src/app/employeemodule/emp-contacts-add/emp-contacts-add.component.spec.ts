import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpContactsAddComponent } from './emp-contacts-add.component';

describe('EmpContactsAddComponent', () => {
  let component: EmpContactsAddComponent;
  let fixture: ComponentFixture<EmpContactsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpContactsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpContactsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
