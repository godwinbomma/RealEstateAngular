import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynContactsDetailComponent } from './syn-contacts-detail.component';

describe('SynContactsDetailComponent', () => {
  let component: SynContactsDetailComponent;
  let fixture: ComponentFixture<SynContactsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynContactsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynContactsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
