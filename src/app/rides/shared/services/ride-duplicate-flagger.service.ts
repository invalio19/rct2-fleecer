import { Injectable } from '@angular/core';

import { Ride } from '../models/ride.model';
import { RideTypeRepositoryService } from './ride-type-repository.service';

@Injectable({
  providedIn: 'root'
})
export class RideDuplicateFlaggerService {
  constructor(private rideTypeRepositoryService: RideTypeRepositoryService) {}

  flag(rides: Ride[]) {
    for (const ride of rides) {
      ride.duplicates = [];

      if (ride.typeId === undefined) {
        continue;
      }

      const groupId = this.rideTypeRepositoryService.get(ride.typeId).groupId;

      for (const ride2 of rides) {
        if (ride2.typeId !== undefined) {
          const groupId2 = this.rideTypeRepositoryService.get(ride2.typeId).groupId;

          if (ride !== ride2 && groupId === groupId2) { // all matching groups from rides that aren't itself
            ride.duplicates.push(ride2.name);
          }
        }
      }
    }
  }
}
