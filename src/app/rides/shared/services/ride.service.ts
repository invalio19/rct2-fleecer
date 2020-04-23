import { Injectable } from '@angular/core';

import { Ride } from '../models/ride.model';
import { RideGroup } from '../models/ride-group.model';
import { RideGroupRepositoryService } from './ride-group-repository.service';
import { RideType } from './../models/ride-type.model';
import { RideTypeRepositoryService } from './ride-type-repository.service';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  constructor(
    private rideGroupRepositoryService: RideGroupRepositoryService,
    private rideTypeRepositoryService: RideTypeRepositoryService) {}

  getType(ride: Ride): RideType {
    return this.rideTypeRepositoryService.get(ride.typeId);
  }

  getGroup(ride: Ride): RideGroup {
    const rideType = this.getType(ride);
    if (rideType !== undefined) {
      return this.rideGroupRepositoryService.get(rideType.groupId);
    }
  }

  getInitialName(ride: Ride, rides: Ride[]) {
    const rideType = this.getType(ride);
    if (rideType === undefined) {
      return '';
    }

    const name = rideType.name;

    const existingSuffixNumbers: number[] = [];
    for (const r of rides) {
      const regex = new RegExp('^' + name + ' (\\d+)$');
      const match = regex.exec(r.name);
      if (match) {
        const suffixNumber = match[1];
        existingSuffixNumbers.push(+suffixNumber);
      }
    }

    // Sort numerically instead of by string
    existingSuffixNumbers.sort((a, b) => {
      return a - b;
    });

    let numberToSuffix = 1;
    for (let i = 1; i <= existingSuffixNumbers.length; i++) {
      if (i === existingSuffixNumbers[i - 1]) {
        numberToSuffix++;
      }
    }

    return name + ' ' + numberToSuffix;
  }
}
