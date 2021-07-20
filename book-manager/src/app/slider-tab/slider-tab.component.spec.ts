import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTabComponent } from './slider-tab.component';

describe('SliderTabComponent', () => {
  let component: SliderTabComponent;
  let fixture: ComponentFixture<SliderTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
