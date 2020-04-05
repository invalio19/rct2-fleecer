import { Component, OnInit } from '@angular/core';

import { GameVersion } from './../shared/game-version';
import { LocalStorageService } from './../shared/services/local-storage.service';
import { Ride, RideAge } from '../shared/models/ride.model';
import { RideDuplicateFlaggerService } from './../shared/services/ride-duplicate-flagger.service';
import { RidePriceCalculatorService } from './../shared/services/ride-price-calculator.service';
import { SaveData } from '../shared/models/save-data.model';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.scss']
})
export class RideListComponent implements OnInit {
  GameVersion = GameVersion; // enum for the component to use
  saveData: SaveData;
  rides: Ride[]; // rather than typing this.saveData.rides everywhere

  expandedIndex: number;

  deleteAllRidesModalClass = ''; // changes to is-active when clicked todo is this really needed

  constructor(
    private localStorageService: LocalStorageService,
    private rideDuplicateFlaggerService: RideDuplicateFlaggerService,
    private ridePriceCalculatorService: RidePriceCalculatorService) {
    this.saveData = this.localStorageService.load();
    this.rides = this.saveData.rides;
    this.rideDuplicateFlaggerService.flag(this.rides);
  }

  ngOnInit(): void {}

  getMaxPriceString(ride: Ride): string {
    const maxPrice = this.ridePriceCalculatorService.calculateMax(ride, this.saveData.gameVersion, this.saveData.hasEntranceFee);
    return this.convertToCurrencyString(maxPrice);
  }

  getMinPriceString(ride: Ride): string { // todo: display
    const minPrice = this.ridePriceCalculatorService.calculateMin(ride, this.saveData.gameVersion, this.saveData.hasEntranceFee);
    return this.convertToCurrencyString(minPrice);
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
    return ride.age !== RideAge.LessThan5Months;
  }

  onUpgradeRideAge(ride: Ride) {
    if (this.canUpgradeRideAge(ride)) {
      ride.age--;
    }
  }

  canDegradeRideAge(ride: Ride) {
    return ride.age !== RideAge.MoreThan200Months; // TODO: mark as last somehow
  }

  onDegradeRideAge(ride: Ride) {
    if (this.canDegradeRideAge(ride)) {
      ride.age++;
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
    const ride: Ride = new Ride();
    ride.age = RideAge.LessThan5Months;

    this.rides.push(ride);

    this.localStorageService.save(this.saveData);

    this.onExpandCollapseRide(this.rides.length - 1);
  }

  onAttemptDeleteAllRides() {
    this.deleteAllRidesModalClass = 'is-active';
  }

  onCloseDeleteAllRidesModal() {
    this.deleteAllRidesModalClass = '';
  }

  onDeleteAllRides() {
    this.onCloseDeleteAllRidesModal();
    this.rides = [];
    this.localStorageService.clear();
  }

  onSave(): void { // TODO: temporary!
    this.localStorageService.save(this.saveData);
  }

  // @Outputs
  onRideDeleted(index: number) { // triggered from child component
    this.rides.splice(index, 1);
    this.rideDuplicateFlaggerService.flag(this.rides);
  }

  onRideTypeChanged() {
    this.rideDuplicateFlaggerService.flag(this.rides);
  }

  // Private methods
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
