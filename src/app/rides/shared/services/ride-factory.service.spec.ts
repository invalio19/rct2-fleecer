import { TestBed } from '@angular/core/testing';

import { RideFactoryService } from './ride-factory.service';

describe('RideFactoryService', () => {
  let service: RideFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
