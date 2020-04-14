import { TestBed } from '@angular/core/testing';

import { RidePriceCalculatorService } from './ride-price-calculator.service';

import { GameVersion } from './../enums/game-version';
import { Ride } from '../models/ride.model';
import { RideAge } from './../enums/ride-age';
import { RideAgeRepositoryService } from './ride-age-repository.service';
import { RideCalculationParameters } from '../models/ride-calculation-parameters.model';
import { RideGroup } from '../models/ride-group.model';
import { RideGroupRepositoryService } from './ride-group-repository.service';
import { RideType } from './../models/ride-type.model';
import { RideTypeRepositoryService } from './ride-type-repository.service';

describe('RidePriceCalculatorService', () => {
  let service: RidePriceCalculatorService;

  const rideAgeRepositoryServiceSpy = jasmine.createSpyObj('RideAgeRepositoryService', ['get']);
  const rideGroupRepositoryServiceSpy = jasmine.createSpyObj('RideGroupRepositoryService', ['get']);
  const rideTypeRepositoryServiceSpy = jasmine.createSpyObj('RideTypeRepositoryService', ['get']);

  const woodenRollerCoasterTestGroup: RideGroup = {
    id: 'woodenRollerCoasterTestGroup',
    name: 'Wooden Roller Coaster',
    excitement: 52,
    intensity: 33,
    nausea: 8
  };

  const woodenRollerCoasterTestType: RideType = {
    id: 'woodenRollerCoasterTestType',
    name: 'Wooden Roller Coaster',
    groupId: 'woodenRollerCoasterTestGroup'
  };

  const juniorRollerCoasterTestGroup: RideGroup = {
    id: 'juniorRollerCoasterTestGroup',
    name: 'Junior Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10
  };

  const juniorRollerCoasterTestType: RideType = {
    id: 'juniorRollerCoasterTestType',
    name: 'Junior Roller Coaster',
    groupId: 'juniorRollerCoasterTestGroup'
  };

  const logFlumeTestGroup: RideGroup = {
    id: 'logFlumeTestGroup',
    name: 'Log Flume',
    excitement: 80,
    intensity: 34,
    nausea: 6
  };

  const logFlumeTestType: RideType = {
    id: 'logFlumeTestType',
    name: 'Log Flume',
    groupId: 'logFlumeTestGroup'
  };

  const mineTrainCoasterTestGroup: RideGroup = {
    id: 'mineTrainCoasterTestGroup',
    name: 'Mine Train Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10
  };

  const mineTrainCoasterTestType: RideType = {
    id: 'mineTrainCoasterTestType',
    name: 'Mine Train Coaster',
    groupId: 'mineTrainCoasterTestGroup'
  };

  rideAgeRepositoryServiceSpy.get.withArgs(RideAge.LessThan5Months, GameVersion.OpenRct2).and.returnValue([5, 3, 2, 0]);
  rideAgeRepositoryServiceSpy.get.withArgs(RideAge.LessThan13Months, GameVersion.OpenRct2).and.returnValue([5, 6, 5, 0]);

  rideGroupRepositoryServiceSpy.get.withArgs('woodenRollerCoasterTestGroup').and.returnValue(woodenRollerCoasterTestGroup);
  rideTypeRepositoryServiceSpy.get.withArgs('woodenRollerCoasterTestType').and.returnValue(woodenRollerCoasterTestType);

  rideGroupRepositoryServiceSpy.get.withArgs('juniorRollerCoasterTestGroup').and.returnValue(juniorRollerCoasterTestGroup);
  rideTypeRepositoryServiceSpy.get.withArgs('juniorRollerCoasterTestType').and.returnValue(juniorRollerCoasterTestType);

  rideGroupRepositoryServiceSpy.get.withArgs('logFlumeTestGroup').and.returnValue(logFlumeTestGroup);
  rideTypeRepositoryServiceSpy.get.withArgs('logFlumeTestType').and.returnValue(logFlumeTestType);

  rideGroupRepositoryServiceSpy.get.withArgs('mineTrainCoasterTestGroup').and.returnValue(mineTrainCoasterTestGroup);
  rideTypeRepositoryServiceSpy.get.withArgs('mineTrainCoasterTestType').and.returnValue(mineTrainCoasterTestType);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RidePriceCalculatorService,
        { provide: RideAgeRepositoryService, useValue: rideAgeRepositoryServiceSpy },
        { provide: RideGroupRepositoryService, useValue: rideGroupRepositoryServiceSpy },
        { provide: RideTypeRepositoryService, useValue: rideTypeRepositoryServiceSpy }
      ]
    });
    service = TestBed.inject(RidePriceCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#calculateMax should calculate the correct value', () => {
    [
      [GameVersion.OpenRct2, false, 'woodenRollerCoasterTestType', RideAge.LessThan5Months, 6.48, 7.62, 4.48, true, 13.20],
      [GameVersion.OpenRct2, false, 'woodenRollerCoasterTestType', RideAge.LessThan13Months, 6.48, 7.62, 4.48, true, 10.60]
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
      const calculatedValue = service.calculateMax(rideCalculationParameters);

      // Assert
      expect(calculatedValue).toBe(expectedValue as number);
    });
  });

  it('#calculateMin should calculate the correct value', () => {
    [
      [GameVersion.OpenRct2, false, 'juniorRollerCoasterTestType', RideAge.LessThan5Months, 4.77, 5.60, 3.62, false, 3.10],
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
      const calculatedValue = service.calculateMin(rideCalculationParameters);

      // Assert
      expect(calculatedValue).toBe(expectedValue as number);
    });
  });

  it('#calculateRecommendedParkEntranceFee should calculate the correct value', () => {
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
    const calculatedValue = service.calculateRecommendedParkEntranceFee(gameVersion, rides);

    // Assert
    expect(calculatedValue).toBe(36.00); // £7.80 + £11 + £18 = £36.80, rounded down to nearest whole £1
  });

  it('#calculateRecommendedParkEntranceFee should ignore incomplete rides instead of returning NaN', () => {
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
    const calculatedValue = service.calculateRecommendedParkEntranceFee(gameVersion, rides);

    // Assert
    expect(calculatedValue).toBe(7.00); // £7.80 + £11 + £18 = £36.80, rounded down to nearest whole £1
  });
});


