import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBankComponent } from './manage-bank.component';

describe('ManageBankComponent', () => {
  let component: ManageBankComponent;
  let fixture: ComponentFixture<ManageBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
