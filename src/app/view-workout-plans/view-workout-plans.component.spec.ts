import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkoutPlansComponent } from './view-workout-plans.component';

describe('ViewWorkoutPlansComponent', () => {
  let component: ViewWorkoutPlansComponent;
  let fixture: ComponentFixture<ViewWorkoutPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWorkoutPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkoutPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
