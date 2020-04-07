import { TestBed } from '@angular/core/testing';

import { RideGroupRepositoryService } from './ride-group-repository.service';

describe('RideGroupRepositoryService', () => {
  let service: RideGroupRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideGroupRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
