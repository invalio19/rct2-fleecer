import { Component, OnInit } from '@angular/core';
import { Ride } from '../shared/ride.model';
import { RideType } from '../shared/ride-type.model';
import { RideTypeRepositoryService } from './../shared/ride-type-repository.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.scss']
})
export class RideListComponent implements OnInit {
  rides: Ride[] = [];
  rideTypes: RideType[] = this.rideTypeRepositoryService.get();

  constructor(private rideTypeRepositoryService: RideTypeRepositoryService) {}

  ngOnInit(): void {
    this.loadRidesFromLocalStorage();
  }

  onAddNewAttraction(): void {
    const ride = new Ride();
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
        const ride = new Ride(localRide);
        this.rides.push(ride);
      }
    }
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
