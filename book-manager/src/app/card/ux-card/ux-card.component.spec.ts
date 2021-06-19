import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UxCardComponent } from './ux-card.component';

describe('UxCardComponent', () => {
  let component: UxCardComponent;
  let fixture: ComponentFixture<UxCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UxCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
