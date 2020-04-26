import { TestBed } from '@angular/core/testing';

import { PriceConverterService } from './price-converter.service';

describe('RidePriceConverterService', () => {
  let service: PriceConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#ridePrice should convert ride price correctly', () => {
    // Act
    const price = service.ridePrice(100);

    // Assert
    expect(price).toBe('£10.00');
  });

  it('#ridePrice should cap at £20', () => {
    // Act
    const price = service.ridePrice(300);

    // Assert
    expect(price).toBe('£20.00');
  });

  it('#ridePrice should display \'Free\' if it is £0', () => {
    // Act
    const price = service.ridePrice(0);

    // Assert
    expect(price).toBe('Free');
  });

  it('#ridePrice should be rounded down to the nearest £0.10', () => {
    // Act
    const price = service.ridePrice(46);

    // Assert
    expect(price).toBe('£4.60');
  });

  it('#parkEntrancePrice should convert ride price correctly', () => {
    // Act
    const price = service.parkEntrancePrice(100);

    // Assert
    expect(price).toBe('£10.00');
  });

  it('#parkEntrancePrice should cap at £200', () => {
    // Act
    const price = service.parkEntrancePrice(3000);

    // Assert
    expect(price).toBe('£200.00');
  });

  it('#parkEntrancePrice should display \'Free\' if it is £0', () => {
    // Act
    const price = service.parkEntrancePrice(0);

    // Assert
    expect(price).toBe('Free');
  });

  it('#parkEntrancePrice should be rounded down to the nearest £1', () => {
    // Act
    const price = service.parkEntrancePrice(668);

    // Assert
    expect(price).toBe('£66.00');
  });
});
