import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionComponent } from './edit-action.component';

describe('EditActionComponent', () => {
  let component: EditActionComponent;
  let fixture: ComponentFixture<EditActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
