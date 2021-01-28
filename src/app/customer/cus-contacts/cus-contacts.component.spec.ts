import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusContactsComponent } from './cus-contacts.component';

describe('CusContactsComponent', () => {
  let component: CusContactsComponent;
  let fixture: ComponentFixture<CusContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
