import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToMinibarComponent } from './add-to-minibar.component';

describe('AddToMinibarComponent', () => {
  let component: AddToMinibarComponent;
  let fixture: ComponentFixture<AddToMinibarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToMinibarComponent]
    });
    fixture = TestBed.createComponent(AddToMinibarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
