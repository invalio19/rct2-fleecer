import { Injectable } from '@angular/core';
import { RideType } from './../models/ride-type.model';
import { RideTypesData } from '../../../data/ride-types';

@Injectable({
  providedIn: 'root'
})
export class RideTypeRepositoryService {
  rideTypeIdNamePairs: { id: string, name: string }[] = [];

  constructor() {
    for (const key in RideTypesData) {
      if (RideTypesData.hasOwnProperty(key)) {
        const el = RideTypesData[key];
        this.rideTypeIdNamePairs.push({ id: key, name: el.name });
      }
    }
    this.sortByName(this.rideTypeIdNamePairs);
  }

  getIdNamePairsSortedByName() {
    return this.rideTypeIdNamePairs;
  }

  get(id: string): RideType {
    return RideTypesData[id];
  }

  private sortByName(idNamePairs: { id: string, name: string }[]): void {
    idNamePairs.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      else if (a.name > b.name) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }
}
