import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetnirProjetComponent } from './retnir-projet.component';

describe('RetnirProjetComponent', () => {
  let component: RetnirProjetComponent;
  let fixture: ComponentFixture<RetnirProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetnirProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetnirProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
