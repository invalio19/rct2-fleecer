import { TestBed } from '@angular/core/testing';

import { UnitConverterService } from './unit-converter.service';

describe('UnitConverterService', () => {
  let service: UnitConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#metresToFeet should convert the metres correctly', () => {
    [
      [25, 82], // Air Powered Vertical Coaster
      [9, 29], // Compact Inverted Coaster
      [12, 39], // Giga Coaster
      [6, 19], // Inverted Hairpin Coaster
      [15, 49], // Inverted Impulse Coaster
      [4, 13], // Junior Roller Coaster
      [7, 22], // LIM Launched Roller Coaster
      [10, 32], // Looping Roller Coaster
      [3, 9] // Steeplechase
    ].forEach(([metres, feet]) => {
      // Act
      const calculatedValue = service.metresToFeet(metres);

      // Assert
      expect(calculatedValue).toBe(feet as number);
    });
  });

  it('#mphToKmph should convert the mph correctly', () => {
    [
      [27, 43], // Bobsleigh Coaster
      [22, 35], // Compact Inverted Coaster
      [15, 24], // Dinghy Slide
      [18, 28], // Mini Suspended Coaster
      [11, 17], // Side-Friction Roller Coaster
    ].forEach(([mph, kmph]) => {
      // Act
      const calculatedValue = service.mphToKmph(mph);

      // Assert
      expect(calculatedValue).toBe(kmph as number);
    });
  });
});
