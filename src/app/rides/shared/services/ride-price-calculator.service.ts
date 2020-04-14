import { Injectable } from '@angular/core';

import { GameVersion } from './../enums/game-version';
import { Ride } from '../models/ride.model';
import { RideAgeRepositoryService } from './ride-age-repository.service';
import { RideCalculationParameters } from './../models/ride-calculation-parameters.model';
import { RideGroupRepositoryService } from './ride-group-repository.service';
import { RideTypeRepositoryService } from './ride-type-repository.service';

@Injectable({
  providedIn: 'root'
})
export class RidePriceCalculatorService {
  constructor (
    private rideAgeRepositoryService: RideAgeRepositoryService,
    private rideGroupRepositoryService: RideGroupRepositoryService,
    private rideTypeRepositoryService: RideTypeRepositoryService) {}

  calculateMax(rideCalculationParameters: RideCalculationParameters): number {
    let ridePrice = this.calculateRideValue(rideCalculationParameters.gameVersion, rideCalculationParameters.ride);
    if (ridePrice === undefined) {
      return undefined;
    }

    if (rideCalculationParameters.parkHasEntranceFee) {
      ridePrice = Math.floor(ridePrice / 4);
    }

    ridePrice *= 2;
    ridePrice = Math.min(200, ridePrice); // Cap at £20
    ridePrice /= 10;

    return ridePrice;
  };

  calculateMin(rideCalculationParameters: RideCalculationParameters): number {
    let ridePrice = this.calculateRideValue(rideCalculationParameters.gameVersion, rideCalculationParameters.ride);
    if (ridePrice === undefined) {
      return undefined;
    }

    if (rideCalculationParameters.parkHasEntranceFee) {
      ridePrice = Math.floor(ridePrice / 4);
    }

    ridePrice = Math.floor(ridePrice / 2);
    ridePrice = Math.min(200, ridePrice); // Cap at £20
    ridePrice /= 10;

    return ridePrice;
  }

  calculateRecommendedParkEntranceFee(gameVersion: GameVersion, rides: Ride[]): number {
    let totalRideValueForMoney = this.calculateTotalRideValueForMoney(gameVersion, rides);

    totalRideValueForMoney = Math.floor(totalRideValueForMoney / 10);

    return totalRideValueForMoney;
  }

  private calculateRideValue(gameVersion: GameVersion, ride: Ride): number {
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

    ridePrice *= rideAgeData[1];
    ridePrice = Math.floor(ridePrice / rideAgeData[2]);
    ridePrice += rideAgeData[3];

    if (ride.duplicates !== undefined && ride.duplicates.length > 0) {
      ridePrice -= Math.floor(ridePrice / 4);
    }

    return ridePrice;
  }

  private calculateTotalRideValueForMoney(gameVersion: GameVersion, rides: Ride[]): number {
    let totalValue = 0;

    for (const ride of rides) {
      if (ride.typeId !== undefined) {
        totalValue += this.calculateRideValue(gameVersion, ride) * 2;
      }
    };

    return totalValue;
  }
}
