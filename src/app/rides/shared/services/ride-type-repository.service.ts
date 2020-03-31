import { RideType } from './../models/ride-type.model';
import { Injectable } from '@angular/core';

// @ts-ignore
import RideTypes from  '../../../../assets/data/ride-types.json';

@Injectable({
  providedIn: 'root'
})
export class RideTypeRepositoryService {
  private rideTypes: RideType[] = RideTypes;

  getAll(): RideType[] {
    return this.rideTypes;
  }

  get(id: number): RideType {
    return this.rideTypes[id];
  }
}
