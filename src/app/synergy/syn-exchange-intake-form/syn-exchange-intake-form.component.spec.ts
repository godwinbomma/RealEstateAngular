import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynExchangeIntakeFormComponent } from './syn-exchange-intake-form.component';

describe('SynExchangeIntakeFormComponent', () => {
  let component: SynExchangeIntakeFormComponent;
  let fixture: ComponentFixture<SynExchangeIntakeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynExchangeIntakeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynExchangeIntakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
