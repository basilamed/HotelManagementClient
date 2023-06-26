import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMinibarItemsComponent } from './add-minibar-items.component';

describe('AddMinibarItemsComponent', () => {
  let component: AddMinibarItemsComponent;
  let fixture: ComponentFixture<AddMinibarItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMinibarItemsComponent]
    });
    fixture = TestBed.createComponent(AddMinibarItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
