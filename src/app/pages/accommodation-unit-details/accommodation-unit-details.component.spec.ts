import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationUnitDetailsComponent } from './accommodation-unit-details.component';

describe('AccommodationUnitDetailsComponent', () => {
  let component: AccommodationUnitDetailsComponent;
  let fixture: ComponentFixture<AccommodationUnitDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationUnitDetailsComponent]
    });
    fixture = TestBed.createComponent(AccommodationUnitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
