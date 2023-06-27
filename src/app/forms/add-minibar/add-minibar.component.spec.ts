import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMinibarComponent } from './add-minibar.component';

describe('AddMinibarComponent', () => {
  let component: AddMinibarComponent;
  let fixture: ComponentFixture<AddMinibarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMinibarComponent]
    });
    fixture = TestBed.createComponent(AddMinibarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
