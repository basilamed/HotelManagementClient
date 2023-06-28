import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCharacteristicComponent } from './add-characteristic.component';

describe('AddCharacteristicComponent', () => {
  let component: AddCharacteristicComponent;
  let fixture: ComponentFixture<AddCharacteristicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCharacteristicComponent]
    });
    fixture = TestBed.createComponent(AddCharacteristicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
