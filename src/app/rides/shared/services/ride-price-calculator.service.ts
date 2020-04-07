import { RideGroupRepositoryService } from './ride-group-repository.service';
import { Injectable } from '@angular/core';

import { GameVersion } from '../enums/game-version';
import { Ride } from '../models/ride.model';
import { RideAgeRepositoryService } from './ride-age-repository.service';
import { RideTypeRepositoryService } from './ride-type-repository.service';

@Injectable({
  providedIn: 'root'
})
export class RidePriceCalculatorService {
  constructor (
    private rideAgeRepositoryService: RideAgeRepositoryService,
    private rideGroupRepositoryService: RideGroupRepositoryService,
    private rideTypeRepositoryService: RideTypeRepositoryService) {}

  calculateMax(ride: Ride, gameVersion: GameVersion, hasEntranceFee: boolean): number { // todo pass park and ride
    let ridePrice = this.calculate(ride, gameVersion, hasEntranceFee);
    if (ridePrice === undefined) {
      return undefined;
    }

    ridePrice *= 2;
    ridePrice = Math.min(200, ridePrice); // Cap at £20
    ridePrice /= 10;

    return ridePrice;
  };

  calculateMin(ride: Ride, gameVersion: GameVersion, hasEntranceFee: boolean): number {
    let ridePrice = this.calculate(ride, gameVersion, hasEntranceFee);
    if (ridePrice === undefined) {
      return undefined;
    }

    ridePrice = Math.floor(ridePrice / 2);
    ridePrice = Math.min(200, ridePrice); // Cap at £20
    ridePrice /= 10;

    return ridePrice;
  }

  private calculate(ride: Ride, gameVersion: GameVersion, hasEntranceFee: boolean): number {
    if (ride.typeId === undefined) {
      return undefined;
    }

    const rideType = this.rideTypeRepositoryService.get(ride.typeId);
    const rideGroup = this.rideGroupRepositoryService.get(rideType.groupId);

    // tslint:disable:no-bitwise
    let ridePrice =
      ((ride.excitement * 100 * rideGroup.excitement * 32) >> 15) +
      ((ride.intensity * 100 * rideGroup.intensity * 32) >> 15) +
      ((ride.nausea * 100 * rideGroup.nausea * 32) >> 15);
    // tslint:enable:no-bitwise

    const rideAgeData = this.rideAgeRepositoryService.get(ride.age, gameVersion);

    ridePrice *= rideAgeData[1]; // todo
    ridePrice = Math.floor(ridePrice / rideAgeData[2]);
    ridePrice += rideAgeData[3];

    if (ride.duplicates !== undefined && ride.duplicates.length > 0) {
      ridePrice -= Math.floor(ridePrice / 4);
    }

    if (hasEntranceFee) {
      ridePrice = Math.floor(ridePrice / 4);
    }

    return ridePrice;
  }
}
