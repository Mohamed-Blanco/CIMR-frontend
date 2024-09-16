import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCollaborateurComponent } from './view-collaborateur.component';

describe('ViewCollaborateurComponent', () => {
  let component: ViewCollaborateurComponent;
  let fixture: ComponentFixture<ViewCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCollaborateurComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
