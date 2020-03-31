import { Component, OnInit } from '@angular/core';
import { Ride } from '../shared/models/ride.model';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';
import { RideFactoryService } from './../shared/services/ride-factory.service';
import { RideType } from '../shared/models/ride-type.model';
import { RideTypeRepositoryService } from '../shared/services/ride-type-repository.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.scss']
})
export class RideListComponent implements OnInit {
  rides: Ride[] = [];
  rideTypes: RideType[] = this.rideTypeRepositoryService.getAll();

  constructor(
    private rideTypeRepositoryService: RideTypeRepositoryService,
    private rideAgeRepositoryService: RideAgeRepositoryService,
    private rideFactoryService: RideFactoryService) {}

  ngOnInit(): void {
    this.loadRidesFromLocalStorage();
  }

  onAddNewAttraction(): void {
    const ride = new Ride();
    ride.age = this.rideAgeRepositoryService.get(0);
    this.rides.push(ride);
    this.saveRidesToLocalStorage();
  }

  onDeleteAllRides(): void {
    this.rides = [];
    this.clearLocalStorage();
  }

  saveRidesToLocalStorage(): void {
    localStorage.setItem('rides', JSON.stringify(this.rides));
  }

  loadRidesFromLocalStorage(): void {
    const localStorageRides = JSON.parse(localStorage.getItem('rides'));
    if (localStorageRides) {
      for (const localRide of localStorageRides) {
        const ride = this.rideFactoryService.create(localRide);
        this.rides.push(ride);
      }
    }
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
