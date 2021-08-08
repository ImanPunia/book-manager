import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderParentComponent } from './slider-parent.component';

describe('SliderParentComponent', () => {
  let component: SliderParentComponent;
  let fixture: ComponentFixture<SliderParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
