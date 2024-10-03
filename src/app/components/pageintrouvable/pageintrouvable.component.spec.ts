import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageintrouvableComponent } from './pageintrouvable.component';

describe('PageintrouvableComponent', () => {
  let component: PageintrouvableComponent;
  let fixture: ComponentFixture<PageintrouvableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageintrouvableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageintrouvableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
