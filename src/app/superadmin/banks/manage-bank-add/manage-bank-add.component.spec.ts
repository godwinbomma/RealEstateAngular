import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBankAddComponent } from './manage-bank-add.component';

describe('ManageBankAddComponent', () => {
  let component: ManageBankAddComponent;
  let fixture: ComponentFixture<ManageBankAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBankAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBankAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
