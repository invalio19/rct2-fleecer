import { TestBed } from '@angular/core/testing';

import { RidePriceCalculatorService } from './ride-price-calculator.service';

import { GameVersion } from './../enums/game-version';
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

  const woodenCoasterTestGroup: RideGroup = {
    id: 'woodenCoasterTestGroup',
    name: 'Wooden Roller Coaster',
    excitement: 52,
    intensity: 33,
    nausea: 8
  };

  const woodenCoasterTestType: RideType = {
    id: 'woodenCoasterTestType',
    name: 'Wooden Roller Coaster',
    groupId: 'woodenCoasterTestGroup'
  };

  const juniorCoasterTestGroup: RideGroup = {
    id: 'juniorCoasterTestGroup',
    name: 'Junior Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10
  };

  const juniorCoasterTestType: RideType = {
    id: 'juniorCoasterTestType',
    name: 'Junior Roller Coaster',
    groupId: 'juniorCoasterTestGroup'
  };

  rideAgeRepositoryServiceSpy.get.withArgs(RideAge.LessThan5Months, GameVersion.OpenRct2).and.returnValue([5, 3, 2, 0]);
  rideAgeRepositoryServiceSpy.get.withArgs(RideAge.LessThan13Months, GameVersion.OpenRct2).and.returnValue([5, 6, 5, 0]);

  rideGroupRepositoryServiceSpy.get.withArgs('woodenCoasterTestGroup').and.returnValue(woodenCoasterTestGroup);
  rideTypeRepositoryServiceSpy.get.withArgs('woodenCoasterTestType').and.returnValue(woodenCoasterTestType);

  rideGroupRepositoryServiceSpy.get.withArgs('juniorCoasterTestGroup').and.returnValue(juniorCoasterTestGroup);
  rideTypeRepositoryServiceSpy.get.withArgs('juniorCoasterTestType').and.returnValue(juniorCoasterTestType);

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

  it('#calculateMax should calculate the correct calculation value', () => {
    [
      [GameVersion.OpenRct2, false, 'woodenCoasterTestType', RideAge.LessThan5Months, 6.48, 7.62, 4.48, true, 13.20],
      [GameVersion.OpenRct2, false, 'woodenCoasterTestType', RideAge.LessThan13Months, 6.48, 7.62, 4.48, true, 10.60]
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

  it('#calculateMin should calculate the correct calculation value', () => {
    [
      [GameVersion.OpenRct2, false, 'juniorCoasterTestType', RideAge.LessThan5Months, 4.77, 5.60, 3.62, false, 3.10],
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
});


