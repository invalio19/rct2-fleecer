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

  expandedIndex: number;

  constructor(
    private rideTypeRepositoryService: RideTypeRepositoryService,
    private rideAgeRepositoryService: RideAgeRepositoryService,
    private rideFactoryService: RideFactoryService) {}

  ngOnInit(): void {
    this.loadRidesFromLocalStorage();
  }

  getMaxPriceString(ride: Ride): string {
    return this.convertToCurrencyString(ride.maxPrice);
  }

  getMinPriceString(ride: Ride): string {
    return this.convertToCurrencyString(ride.minPrice);
  }

  onMoveRideUp(index: number) {
    if (index === 0) {
      return;
    }

    this.arraySwap(this.rides, index, index -1);
  }

  onMoveRideDown(index: number) {
    if (index === this.rides.length - 1) {
      return;
    }

    this.arraySwap(this.rides, index, index + 1);
  }

  onDegradeRideAge(ride: Ride) {
    const id = ride.age.id;
    if (this.rideAgeRepositoryService.isLastEntry(id)) {
      return;
    }

    ride.age = this.rideAgeRepositoryService.get(id + 1);
  }

  onExpandCollapseRide(index: number) {
    if (this.expandedIndex === index) { // collapse
      this.expandedIndex = undefined;
    } else {
      this.expandedIndex = index; // expand
    }
  }

  onAddNewAttraction(): void {
    const ride = new Ride();
    ride.age = this.rideAgeRepositoryService.get(0);
    this.rides.push(ride);
    this.saveRidesToLocalStorage();
    this.onExpandCollapseRide(this.rides.length - 1);
  }

  onDeleteAllRides(): void {
    this.rides = [];
    this.clearLocalStorage();
  }

  onRideDeleted(index: number) { // triggered from child component
    this.rides.splice(index, 1);
  }

  saveRidesToLocalStorage(): void {
    localStorage.setItem('rides', JSON.stringify(this.rides));
  }

  private loadRidesFromLocalStorage(): void {
    const localStorageRides = JSON.parse(localStorage.getItem('rides'));
    if (localStorageRides) {
      for (const localRide of localStorageRides) {
        const ride = this.rideFactoryService.create(localRide);
        this.rides.push(ride);
      }
    }
  }

  private clearLocalStorage(): void {
    localStorage.clear();
  }

  private convertToCurrencyString(val: number): string {
    if (val !== undefined) {
      if (val === 0) {
        return 'Free';
      }
      return '£' + val.toFixed(2);
    }
    return '';
  }

  private arraySwap(arr: any[], fromIndex: number, toIndex: number): void { // TODO: shared util class
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }
}
