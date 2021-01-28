import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynergyClientsAddDetailComponent } from './synergy-clients-add-detail.component';

describe('SynergyClientsAddDetailComponent', () => {
  let component: SynergyClientsAddDetailComponent;
  let fixture: ComponentFixture<SynergyClientsAddDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynergyClientsAddDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynergyClientsAddDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
