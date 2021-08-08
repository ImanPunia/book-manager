import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMultipleComponent } from './delete-multiple.component';

describe('DeleteMultipleComponent', () => {
  let component: DeleteMultipleComponent;
  let fixture: ComponentFixture<DeleteMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
