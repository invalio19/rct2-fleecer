import { TestBed } from '@angular/core/testing';

import { PersistenceService } from './persistence.service';

import { GameVersion } from '../enums/game-version';
import { RideAge } from '../enums/ride-age';
import { SaveData } from './../models/save-data.model';

describe('PersistenceService', () => {
  let service: PersistenceService;

  const saveDataKey = 'saveData';

  const saveData: SaveData = {
    appVersion: '1.2.0',
    options: {
      gameVersion: GameVersion.OpenRct2
    },
    parks: [
      {
        name: '',
        hasEntranceFee: true,
        isAlsoChargingForRides: false,
        showGoodValuePrice: false,
        rides: [
          {
            name: 'Manic Miners',
            typeId: 'mineRide',
            age: RideAge.LessThan64Months,
            excitement: 6.04,
            intensity: 7.57,
            nausea: 4.62,
            duplicates: ['Mine Ride 1']
          }
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistenceService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#save should store save data to LocalStorage', () => {
    // Act
    service.save(saveData);

    // Assert
    const saveDataFromLocalStorage = JSON.parse(localStorage.getItem(saveDataKey));
    expect(saveDataFromLocalStorage).toEqual(saveData);
  });

  it('#load should load save data from LocalStorage if it exists', () => {
    // Arrange
    localStorage.setItem(saveDataKey, JSON.stringify(saveData));

    // Act
    const saveDataFromLocalStorage = service.load();

    // Assert
    expect(saveDataFromLocalStorage).toEqual(saveData);
  });

  it('#load should return undefined if nothing exists in LocalStorage', () => {
    // Act
    const saveDataFromLocalStorage = service.load();

    // Assert
    expect(saveDataFromLocalStorage).toBeUndefined();
  });
});