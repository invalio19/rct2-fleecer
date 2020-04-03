import { Component, OnInit } from '@angular/core';

import { GameVersion } from './../shared/game-version';
import { LocalStorageService, SaveData } from './../shared/services/local-storage.service';
import { Ride } from '../shared/models/ride.model';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.scss']
})
export class RideListComponent implements OnInit {
  GameVersion = GameVersion; // so the component can use the enum
  saveData: SaveData;
  rides: Ride[]; // rather than typing this.saveData.rides everywhere

  expandedIndex: number;

  constructor(
    private localStorageService: LocalStorageService,
    private rideAgeRepositoryService: RideAgeRepositoryService) {
    this.saveData = this.localStorageService.load();
    this.rides = this.saveData.rides;
  }

  ngOnInit(): void {}

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

  canUpgradeRideAge(ride: Ride) {
    return ride.age.id !== 0; // TODO: should be index really
  }

  onUpgradeRideAge(ride: Ride) {
    if (this.canUpgradeRideAge(ride)) {
      ride.age = this.rideAgeRepositoryService.get(ride.age.id - 1);
    }
  }

  canDegradeRideAge(ride: Ride) {
    return !this.rideAgeRepositoryService.isLastEntry(ride.age.id);
  }

  onDegradeRideAge(ride: Ride) {
    if (this.canDegradeRideAge(ride)) {
      ride.age = this.rideAgeRepositoryService.get(ride.age.id + 1);
    }
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

    this.localStorageService.save(this.saveData);

    this.onExpandCollapseRide(this.rides.length - 1);
  }

  onDeleteAllRides(): void {
    this.rides = [];
    this.localStorageService.clear();
  }

  onSave(): void { // TODO: temporary!
    this.localStorageService.save(this.saveData);
  }

  onRideDeleted(index: number) { // triggered from child component
    this.rides.splice(index, 1);
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
