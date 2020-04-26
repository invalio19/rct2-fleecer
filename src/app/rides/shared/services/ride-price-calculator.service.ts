import { Injectable } from '@angular/core';

import { AdmissionMode } from '../models/park.model';
import { GameVersion } from './../enums/game-version';
import { Ride } from '../models/ride.model';
import { RideAgeRepositoryService } from './ride-age-repository.service';
import { RideCalculationParameters } from './../models/ride-calculation-parameters.model';
import { RideService } from './ride.service';

@Injectable({
  providedIn: 'root'
})
export class RidePriceCalculatorService {
  constructor (
    private rideAgeRepositoryService: RideAgeRepositoryService,
    private rideService: RideService) {}

  max(rideCalculationParameters: RideCalculationParameters): number {
    if (rideCalculationParameters.parkAdmissionMode === AdmissionMode.PayToEnterParkFreeRides) {
      return 0;
    }

    let ridePrice = this.calculateRideValue(rideCalculationParameters.gameVersion, rideCalculationParameters.ride);
    if (ridePrice === undefined) {
      return undefined;
    }

    if (rideCalculationParameters.parkAdmissionMode === AdmissionMode.PayToEnterParkPayPerRide) {
      ridePrice = Math.floor(ridePrice / 4);
    }

    ridePrice *= 2;

    return ridePrice;
  };

  min(rideCalculationParameters: RideCalculationParameters): number {
    let ridePrice = this.calculateRideValue(rideCalculationParameters.gameVersion, rideCalculationParameters.ride);
    if (ridePrice === undefined) {
      return undefined;
    }

    if (rideCalculationParameters.parkAdmissionMode === AdmissionMode.PayToEnterParkPayPerRide) {
      ridePrice = Math.floor(ridePrice / 4);
    }

    ridePrice = Math.floor(ridePrice / 2);

    return ridePrice;
  }

  recommendedParkEntranceFee(gameVersion: GameVersion, rides: Ride[], parkAdmissionMode: AdmissionMode): number {
    const totalRideValueForMoney = this.calculateTotalRideValueForMoney(gameVersion, rides, parkAdmissionMode);
    return totalRideValueForMoney;
  }

  private calculateRideValue(gameVersion: GameVersion, ride: Ride): number {
    if (ride.typeId === undefined) {
      return undefined;
    }

    const rideGroup = this.rideService.getGroup(ride);

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

  private calculateTotalRideValueForMoney(gameVersion: GameVersion, rides: Ride[], parkAdmissionMode: AdmissionMode): number {
    let totalValue = 0;

    for (const ride of rides) {
      const params: RideCalculationParameters = {
        gameVersion,
        parkAdmissionMode,
        ride
      };

      const rideValue = this.calculateRideValue(gameVersion, ride);
      const ridePrice = this.max(params);

      if (ride.typeId !== undefined) {
        totalValue += (rideValue - ridePrice) * 2;
      }
    };

    return totalValue;
  }
}
