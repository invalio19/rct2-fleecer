import { Component, OnInit } from '@angular/core';

import { GameVersion } from '../shared/enums/game-version';
import { PersistenceService } from './../shared/services/persistence.service';
import { Ride } from '../shared/models/ride.model';
import { RideAge } from '../shared/enums/ride-age';
import { RideDuplicateFlaggerService } from './../shared/services/ride-duplicate-flagger.service';
import { RidePriceCalculatorService } from './../shared/services/ride-price-calculator.service';
import { SaveData } from '../shared/models/save-data.model';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html'
})
export class RideListComponent implements OnInit {
  GameVersion = GameVersion; // enum for the component to use
  saveData: SaveData;
  rides: Ride[]; // rather than typing this.saveData.rides everywhere

  expandedIndex: number;

  deleteAllRidesModalClass = ''; // changes to is-active when clicked

  constructor(
    private persistenceService: PersistenceService,
    private rideDuplicateFlaggerService: RideDuplicateFlaggerService,
    private ridePriceCalculatorService: RidePriceCalculatorService) {
      this.saveData = this.persistenceService.load();
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

  onChangeHasEntranceFee() {
    if (this.saveData.hasEntranceFee) {
      this.saveData.showGoodValuePrice = false;
    }
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
    const ride: Ride = {
      name: '',
      typeId: undefined,
      age: RideAge.LessThan5Months,
      excitement: undefined,
      intensity: undefined,
      nausea: undefined,
      isDuplicate: false
    };

    this.rides.push(ride);

    this.persistenceService.save(this.saveData);

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
    this.persistenceService.clear();
  }

  onSave(): void { // TODO: temporary!
    this.persistenceService.save(this.saveData);
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

  private arraySwap(arr: any[], fromIndex: number, toIndex: number): void {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }
}
