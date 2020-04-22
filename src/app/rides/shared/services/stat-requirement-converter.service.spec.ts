import { TestBed } from '@angular/core/testing';

import { StatRequirementConverterService } from './stat-requirement-converter.service';

import { UnitConverterService } from './unit-converter.service';

describe('RidePenaltyConverterService', () => {
  let service: StatRequirementConverterService;

  const unitConverterServiceSpy = jasmine.createSpyObj('UnitConverterService', ['mphToKmph']);
  unitConverterServiceSpy.mphToKmph.withArgs(27).and.returnValue(43);
  unitConverterServiceSpy.mphToKmph.withArgs(22).and.returnValue(35);
  unitConverterServiceSpy.mphToKmph.withArgs(15).and.returnValue(24);
  unitConverterServiceSpy.mphToKmph.withArgs(18).and.returnValue(28);
  unitConverterServiceSpy.mphToKmph.withArgs(11).and.returnValue(17);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatRequirementConverterService,
        { provide: UnitConverterService, useValue: unitConverterServiceSpy }
      ]
    });
    service = TestBed.inject(StatRequirementConverterService);
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
      [0xC0000, 43], // Bobsleigh Coaster
      [0xA0000, 35], // Compact Inverted Coaster
      [0x70000, 24], // Dinghy Slide
      [0x80000, 28], // Mini Suspended Coaster
      [0x50000, 17], // Side-Friction Roller Coaster
    ].forEach(([input, expected]) => {
      // Act
      const calculatedValue = service.maxSpeed(input);

      // Assert
      expect(calculatedValue).toBe(expected as number);
    });
  });

  it('#firstLength should convert the first length correctly', () => {
    [
      [0x1720000, 370], // Bobsleigh Coaster
      [0x8C0000, 140], // Dinghy Slide
      [0xAA0000, 170], // Inverted Hairpin Coaster
      [0x10E0000, 270], // Mine Ride
      [0xC80000, 200], // Mini Suspended Coaster
      [0xFA0000, 250], // Side-Friction Roller coaster
      [0xF00000, 240], // Steeplechase
      [0xD20000, 210], // Virginia Reel
    ].forEach(([input, expected]) => {
      // Act
      const calculatedValue = service.firstLength(input);

      // Assert
      expect(calculatedValue).toBe(expected as number);
    });
  });
});
