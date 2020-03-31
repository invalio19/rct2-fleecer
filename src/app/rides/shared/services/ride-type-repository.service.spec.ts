import { TestBed } from '@angular/core/testing';

import { RideTypeRepositoryService } from './ride-type-repository.service';

describe('RideTypeRepositoryService', () => {
  let service: RideTypeRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideTypeRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
