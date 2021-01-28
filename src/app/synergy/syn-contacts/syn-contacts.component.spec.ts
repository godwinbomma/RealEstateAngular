import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynContactsComponent } from './syn-contacts.component';

describe('SynContactsComponent', () => {
  let component: SynContactsComponent;
  let fixture: ComponentFixture<SynContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
