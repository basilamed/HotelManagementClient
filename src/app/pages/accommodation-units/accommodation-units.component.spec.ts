import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationUnitsComponent } from './accommodation-units.component';

describe('AccomodationUnitsComponent', () => {
  let component: AccommodationUnitsComponent;
  let fixture: ComponentFixture<AccommodationUnitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationUnitsComponent]
    });
    fixture = TestBed.createComponent(AccommodationUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
