import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedRecipesComponent } from './published-recipes.component';

describe('PublishedRecipesComponent', () => {
  let component: PublishedRecipesComponent;
  let fixture: ComponentFixture<PublishedRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
