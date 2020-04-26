import { TestBed } from '@angular/core/testing';

import { RidePriceCalculatorService } from './ride-price-calculator.service';

import { GameVersion } from './../enums/game-version';
import { Ride } from '../models/ride.model';
import { RideAge } from './../enums/ride-age';
import { RideAgeRepositoryService } from './ride-age-repository.service';
import { RideCalculationParameters } from '../models/ride-calculation-parameters.model';
import { RideService } from './ride.service';

describe('RidePriceCalculatorService', () => {
  let service: RidePriceCalculatorService;

  const rideAgeRepositoryServiceSpy = jasmine.createSpyObj('RideAgeRepositoryService', ['get']);
  const rideServiceSpy = jasmine.createSpyObj('RideService', ['getGroup']);

  rideAgeRepositoryServiceSpy.get.withArgs(RideAge.LessThan5Months, GameVersion.OpenRct2).and.returnValue([5, 3, 2, 0]);
  rideAgeRepositoryServiceSpy.get.withArgs(RideAge.LessThan13Months, GameVersion.OpenRct2).and.returnValue([5, 6, 5, 0]);

  rideServiceSpy.getGroup.and.callFake((ride: Ride) => {
    switch (ride.typeId) {
      case 'woodenRollerCoasterTestType':
        return {
          id: 'woodenRollerCoasterTestGroup',
          name: 'Wooden Roller Coaster',
          excitement: 52,
          intensity: 33,
          nausea: 8,
          unreliability: 0,
          baseRatings: []
        };
      case 'juniorRollerCoasterTestType':
        return {
          id: 'juniorRollerCoasterTestGroup',
          name: 'Junior Roller Coaster',
          excitement: 50,
          intensity: 30,
          nausea: 10,
          unreliability: 0,
          baseRatings: []
        };
      case 'logFlumeTestType':
        return {
          id: 'logFlumeTestGroup',
          name: 'Log Flume',
          excitement: 80,
          intensity: 34,
          nausea: 6,
          unreliability: 0,
          baseRatings: []
        };
      case 'mineTrainCoasterTestType':
        return {
          id: 'mineTrainCoasterTestGroup',
          name: 'Mine Train Coaster',
          excitement: 50,
          intensity: 30,
          nausea: 10,
          unreliability: 0,
          baseRatings: []
        };
    }
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RidePriceCalculatorService,
        { provide: RideAgeRepositoryService, useValue: rideAgeRepositoryServiceSpy },
        { provide: RideService, useValue: rideServiceSpy },
      ]
    });
    service = TestBed.inject(RidePriceCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#max should calculate the correct value', () => {
    [
      [GameVersion.OpenRct2, false, 'woodenRollerCoasterTestType', RideAge.LessThan5Months, 6.48, 7.62, 4.48, true, 132],
      [GameVersion.OpenRct2, false, 'woodenRollerCoasterTestType', RideAge.LessThan13Months, 6.48, 7.62, 4.48, true, 106]
    ].forEach(([gameVersion, hasEntranceFee, rideTypeId, rideAge, excitement, intensity, nausea, hasDuplicate, expectedValue]) => {
      // Arrange
      const rideCalculationParameters: RideCalculationParameters = {
        gameVersion: gameVersion as GameVersion,
        parkHasEntranceFee: hasEntranceFee as boolean,
        ride: {
          name: 'test ride',
          typeId: rideTypeId as string,
          age: rideAge as RideAge,
          excitement: excitement as number,
          intensity: intensity as number,
          nausea: nausea as number,
          duplicates: hasDuplicate ? ['duplicate ride'] : []
        }
      };

      // Act
      const calculatedValue = service.max(rideCalculationParameters);

      // Assert
      expect(calculatedValue).toBe(expectedValue as number);
    });
  });

  it('#min should calculate the correct value', () => {
    [
      [GameVersion.OpenRct2, false, 'juniorRollerCoasterTestType', RideAge.LessThan5Months, 4.77, 5.60, 3.62, false, 31],
    ].forEach(([gameVersion, hasEntranceFee, rideTypeId, rideAge, excitement, intensity, nausea, hasDuplicate, expectedValue]) => {
      // Arrange
      const rideCalculationParameters: RideCalculationParameters = {
        gameVersion: gameVersion as GameVersion,
        parkHasEntranceFee: hasEntranceFee as boolean,
        ride: {
          name: 'test ride',
          typeId: rideTypeId as string,
          age: rideAge as RideAge,
          excitement: excitement as number,
          intensity: intensity as number,
          nausea: nausea as number,
          duplicates: hasDuplicate ? ['duplicate ride'] : []
        }
      };

      // Act
      const calculatedValue = service.min(rideCalculationParameters);

      // Assert
      expect(calculatedValue).toBe(expectedValue as number);
    });
  });

  it('#recommendedParkEntranceFee should calculate the correct value', () => {
    // Arrange
    const gameVersion: GameVersion = GameVersion.OpenRct2;
    const rides: Ride[] = [
      {
        name: 'test 1',
        typeId: 'woodenRollerCoasterTestType',
        age: RideAge.LessThan5Months,
        excitement: 3.02,
        intensity: 3.25,
        nausea: 1.96,
        duplicates: []
      },
      {
        name: 'test 2',
        typeId: 'logFlumeTestType',
        age: RideAge.LessThan5Months,
        excitement: 3.87,
        intensity: 2.34,
        nausea: 1.12,
        duplicates: []
      },
      {
        name: 'test 3',
        typeId: 'mineTrainCoasterTestType',
        age: RideAge.LessThan5Months,
        excitement: 6.65,
        intensity: 8.18,
        nausea: 5.18,
        duplicates: []
      }
    ];

    // Act
    const calculatedValue = service.recommendedParkEntranceFee(gameVersion, rides);

    // Assert
    expect(calculatedValue).toBe(368); // £7.80 + £11 + £18 = £36.80
  });

  it('#recommendedParkEntranceFee should ignore incomplete rides instead of returning NaN', () => {
    // Arrange
    const gameVersion: GameVersion = GameVersion.OpenRct2;
    const rides: Ride[] = [
      {
        name: 'test 1',
        typeId: 'woodenRollerCoasterTestType',
        age: RideAge.LessThan5Months,
        excitement: 3.02,
        intensity: 3.25,
        nausea: 1.96,
        duplicates: []
      },
      {
        name: '',
        typeId: undefined,
        age: RideAge.LessThan5Months,
        excitement: 0,
        intensity: 0,
        nausea: 0,
        duplicates: []
      }
    ];

    // Act
    const calculatedValue = service.recommendedParkEntranceFee(gameVersion, rides);

    // Assert
    expect(calculatedValue).toBe(78);
  });
});


