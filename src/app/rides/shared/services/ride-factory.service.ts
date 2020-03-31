import { Injectable } from '@angular/core';
import { Ride } from '../models/ride.model';
import { RideTypeRepositoryService } from './ride-type-repository.service';
import { RideAgeRepositoryService } from './ride-age-repository.service';

@Injectable({
  providedIn: 'root'
})
export class RideFactoryService {
  constructor(
    private rideTypeRepositoryService: RideTypeRepositoryService,
    private rideAgeRepositoryService: RideAgeRepositoryService) {}

  create(rideJson: Ride): Ride {
    // This takes a ride JSON entry and fills out the class references properly
    const ride = new Ride();
    ride.name = rideJson.name;
    ride.type = (rideJson.type)
      ? this.rideTypeRepositoryService.get(rideJson.type.id)
      : undefined;
    ride.age = this.rideAgeRepositoryService.get(rideJson.age.id);
    ride.excitement = rideJson.excitement;
    ride.intensity = rideJson.intensity;
    ride.nausea = rideJson.nausea;

    return ride;
  }
}
