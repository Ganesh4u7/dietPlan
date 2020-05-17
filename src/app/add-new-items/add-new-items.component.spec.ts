import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewItemsComponent } from './add-new-items.component';

describe('AddNewItemsComponent', () => {
  let component: AddNewItemsComponent;
  let fixture: ComponentFixture<AddNewItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
