import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDocumentTemplateComponent } from './emp-document-template.component';

describe('EmpDocumentTemplateComponent', () => {
  let component: EmpDocumentTemplateComponent;
  let fixture: ComponentFixture<EmpDocumentTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpDocumentTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpDocumentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
