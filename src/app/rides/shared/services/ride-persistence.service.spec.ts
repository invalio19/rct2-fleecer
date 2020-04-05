import { TestBed } from '@angular/core/testing';

import { RidePersistenceService } from './ride-persistence.service';

describe('RidePersistenceService', () => {
  let service: RidePersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidePersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
