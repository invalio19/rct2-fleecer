import { TestBed } from '@angular/core/testing';

import { RideDuplicateFlaggerService } from './ride-duplicate-flagger.service';

describe('RideDuplicateCheckerService', () => {
  let service: RideDuplicateFlaggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideDuplicateFlaggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
