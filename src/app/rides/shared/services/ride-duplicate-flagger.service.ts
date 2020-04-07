import { RideTypeRepositoryService } from './ride-type-repository.service';
import { Injectable } from '@angular/core';
import { Ride } from '../models/ride.model';

@Injectable({
  providedIn: 'root'
})
export class RideDuplicateFlaggerService {
  constructor(private rideTypeRepositoryService: RideTypeRepositoryService) {}

  flag(rides: Ride[]) {
    const dupes: string[] = [];
    const checked: string[] = [];
    for (const ride of rides) {
      if (ride.typeId === undefined) {
        continue;
      }

      const id = this.rideTypeRepositoryService.get(ride.typeId).groupId;

      if (!checked.includes(id)) {
        checked.push(id);
      }
      else {
        dupes.push(id);
      }
    }

    for (const ride of rides) {
      if (ride.typeId !== undefined) {
        const id = this.rideTypeRepositoryService.get(ride.typeId).groupId;

        ride.isDuplicate = dupes.includes(id);
      }
    }
  }
}
