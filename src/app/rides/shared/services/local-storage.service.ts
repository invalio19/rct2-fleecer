import { Injectable } from '@angular/core';

import { GameVersion } from './../game-version';
import { Ride } from '../models/ride.model';
import { RideFactoryService } from './ride-factory.service';
import { SaveData } from '../models/save-data.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private saveDataKey = 'saveData';

  constructor(private rideFactoryService: RideFactoryService) { }

  save(data: SaveData): void {
    localStorage.setItem(this.saveDataKey, JSON.stringify(data));
  }

  load(): SaveData {
    const loadedData: SaveData = JSON.parse(localStorage.getItem(this.saveDataKey)); // These don't have the right reference objects

    if (loadedData && loadedData.rides) {
      loadedData.rides = this.createRideObjects(loadedData.rides);
      return loadedData;
    }

    const newData = {
      name: '',
      gameVersion: GameVersion.VanillaRct2,
      hasEntranceFee: false,
      rides: []
    };
    return newData;
  }

  clear(): void {
    localStorage.clear();
  }

  private createRideObjects(ridesJson: Ride[]): Ride[] {
    const rideObjects: Ride[] = [];

    for (const rideJson of ridesJson) {
      const ride = this.rideFactoryService.create(rideJson);
      rideObjects.push(ride);
    }

    return rideObjects;
  }
}
