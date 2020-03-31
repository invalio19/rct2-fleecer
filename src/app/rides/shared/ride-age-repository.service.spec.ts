import { TestBed } from '@angular/core/testing';

import { RideAgeRepositoryService } from './ride-age-repository.service';

describe('RideAgeRepositoryService', () => {
  let service: RideAgeRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideAgeRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
