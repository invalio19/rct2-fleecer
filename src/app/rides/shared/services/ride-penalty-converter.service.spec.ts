import { TestBed } from '@angular/core/testing';

import { RidePenaltyConverterService } from './ride-penalty-converter.service';

describe('RidePenaltyConverterService', () => {
  let service: RidePenaltyConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidePenaltyConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#highestDropHeight should convert the drop height correctly', () => {
    [
      [34, 25], // Air Powered Vertical Coaster
      [12, 9], // Compact Inverted Coaster
      [16, 12], // Giga Coaster
      [8, 6], // Inverted Hairpin Coaster
      [20, 15], // Inverted Impulse Coaster
      [6, 4], // Junior Roller Coaster
      [10, 7], // LIM Launched Roller Coaster
      [14, 10], // Looping Roller Coaster
      [4, 3] // Steeplechase
    ].forEach(([input, expected]) => {
      // Act
      const calculatedValue = service.highestDropHeight(input);

      // Assert
      expect(calculatedValue).toBe(expected as number);
    });
  });

  it('#maxSpeed should convert the max speed correctly', () => {
    [
      [0xC0000, 27], // Bobsleigh Coaster
      [0xA0000, 22], // Compact Inverted Coaster
      [0x70000, 15], // Dinghy Slide
      [0x80000, 18], // Mini Suspended Coaster
      [0x50000, 11], // Side-Friction Roller Coaster
    ].forEach(([input, expected]) => {
      // Act
      const calculatedValue = service.maxSpeed(input);

      // Assert
      expect(calculatedValue).toBe(expected as number);
    });
  });
});
