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
}
