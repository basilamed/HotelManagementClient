import { TestBed } from '@angular/core/testing';

import { AccommodationUnitsService } from './accommodation-units.service';

describe('AccomodationUnitsService', () => {
  let service: AccommodationUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
