import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollaborateurComponent } from './add-collaborateur.component';

describe('AddCollaborateurComponent', () => {
  let component: AddCollaborateurComponent;
  let fixture: ComponentFixture<AddCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCollaborateurComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
