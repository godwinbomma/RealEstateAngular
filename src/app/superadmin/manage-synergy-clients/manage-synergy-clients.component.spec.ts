import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSynergyClientsComponent } from './manage-synergy-clients.component';

describe('ManageSynergyClientsComponent', () => {
  let component: ManageSynergyClientsComponent;
  let fixture: ComponentFixture<ManageSynergyClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSynergyClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSynergyClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
