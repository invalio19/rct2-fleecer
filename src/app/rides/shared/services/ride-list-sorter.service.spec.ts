import { TestBed } from '@angular/core/testing';

import { RideListSorterService } from './ride-list-sorter.service';

describe('RideListSorterService', () => {
  let service: RideListSorterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideListSorterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
