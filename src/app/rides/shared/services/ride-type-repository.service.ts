import { Injectable } from '@angular/core';

import { RideType } from './../models/ride-type.model';
import { RideTypeData } from '../../../data/ride-type-data';

@Injectable({
  providedIn: 'root'
})
export class RideTypeRepositoryService {
  private rideTypeArray: RideType[] = [];

  constructor() {
    for (const key in RideTypeData) {
      if (RideTypeData.hasOwnProperty(key)) {
        const el = RideTypeData[key];
        this.rideTypeArray.push(el);
      }
    }
  }

  getAll(): RideType[] {
    return this.rideTypeArray;
  }

  get(id: string): RideType {
    return RideTypeData[id];
  }
}
