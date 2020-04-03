import { TestBed } from '@angular/core/testing';

import { RidePriceCalculatorService } from './ride-price-calculator.service';

describe('RidePriceCalculatorService', () => {
  let service: RidePriceCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidePriceCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
