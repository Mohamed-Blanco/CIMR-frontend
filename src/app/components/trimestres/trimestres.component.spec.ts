import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimestresComponent } from './trimestres.component';

describe('TrimestresComponent', () => {
  let component: TrimestresComponent;
  let fixture: ComponentFixture<TrimestresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrimestresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrimestresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
