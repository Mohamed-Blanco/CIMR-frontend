import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterCollaborateurComponent } from './affecter-collaborateur.component';

describe('AffecterCollaborateurComponent', () => {
  let component: AffecterCollaborateurComponent;
  let fixture: ComponentFixture<AffecterCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffecterCollaborateurComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AffecterCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
