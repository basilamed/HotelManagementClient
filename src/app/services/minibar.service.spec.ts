import { TestBed } from '@angular/core/testing';

import { MinibarService } from './minibar.service';

describe('MinibarService', () => {
  let service: MinibarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinibarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
