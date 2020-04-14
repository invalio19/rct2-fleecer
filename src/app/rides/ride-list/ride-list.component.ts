import { RideCalculationParameters } from './../shared/models/ride-calculation-parameters.model';
import { Component, OnInit } from '@angular/core';

import { GameVersion } from '../shared/enums/game-version';
import { PersistenceService } from './../shared/services/persistence.service';
import { Ride } from '../shared/models/ride.model';
import { RideAge } from '../shared/enums/ride-age';
import { RideDuplicateFlaggerService } from './../shared/services/ride-duplicate-flagger.service';
import { RidePriceCalculatorService } from './../shared/services/ride-price-calculator.service';
import { Park } from '../shared/models/park.model';
import { SaveData } from '../shared/models/save-data.model';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html'
})
export class RideListComponent implements OnInit {
  GameVersion = GameVersion; // enum for the component to use
  saveData: SaveData;
  park: Park;
  rides: Ride[];

  expandedIndex: number;

  isDeleteAllRidesModalActive = false;
  isRecommendedParkEntranceFeeModalActive = false;

  constructor(
    private persistenceService: PersistenceService,
    private rideDuplicateFlaggerService: RideDuplicateFlaggerService,
    private ridePriceCalculatorService: RidePriceCalculatorService) {
      this.saveData = this.persistenceService.load();
      this.park = this.saveData.parks[0];
      this.rides = this.park.rides;
      this.rideDuplicateFlaggerService.flag(this.rides);
  }

  ngOnInit(): void {}

  getMaxPriceString(ride: Ride): string {
    const rideCalculationParameters: RideCalculationParameters = {
      gameVersion: this.saveData.options.gameVersion,
      parkHasEntranceFee: this.park.hasEntranceFee,
      ride
    };

    const maxPrice = this.ridePriceCalculatorService.calculateMax(rideCalculationParameters);
    return this.convertToCurrencyString(maxPrice);
  }

  getMinPriceString(ride: Ride): string {
    const rideCalculationParameters: RideCalculationParameters = {
      gameVersion: this.saveData.options.gameVersion,
      parkHasEntranceFee: this.park.hasEntranceFee,
      ride
    };

    const minPrice = this.ridePriceCalculatorService.calculateMin(rideCalculationParameters);
    return this.convertToCurrencyString(minPrice);
  }

  getRecommendedParkEntranceFeeString(): string {
    const recommendedPrice = this.ridePriceCalculatorService.calculateRecommendedParkEntranceFee(this.saveData.options.gameVersion, this.park.rides);

    return this.convertToCurrencyString(recommendedPrice);
  }

  onClickGameVersion(gameVersion: GameVersion) {
    this.saveData.options.gameVersion = gameVersion;

    this.saveAll();
  }

  onChangeHasEntranceFee() {
    if (this.park.hasEntranceFee) {
      this.park.showGoodValuePrice = false;
    }

    this.saveAll();
  }

  onChangeShowGoodValuePrices() {
    this.saveAll();
  }

  onClickRecommendedParkEntranceFeeWhy() {
    this.isRecommendedParkEntranceFeeModalActive = true;
  }

  onCloseRecommendedParkEntranceFeeModal() {
    this.isRecommendedParkEntranceFeeModalActive = false;
  }

  onChangeRideName() {
    this.rideDuplicateFlaggerService.flag(this.rides); // TODO: overkill
    this.saveAll();
  }

  onMoveRideUp(index: number) {
    if (index === 0) {
      return;
    }

    this.arraySwap(this.rides, index, index -1);

    this.saveAll();
  }

  onMoveRideDown(index: number) {
    if (index === this.rides.length - 1) {
      return;
    }

    this.arraySwap(this.rides, index, index + 1);

    this.saveAll();
  }

  canUpgradeRideAge(ride: Ride) {
    return ride.age !== RideAge.LessThan5Months;
  }

  onUpgradeRideAge(ride: Ride) {
    if (this.canUpgradeRideAge(ride)) {
      ride.age--;
      this.saveAll();
    }
  }

  canDegradeRideAge(ride: Ride) {
    return ride.age !== RideAge.MoreThan200Months;
  }

  onDegradeRideAge(ride: Ride) {
    if (this.canDegradeRideAge(ride)) {
      ride.age++;
      this.saveAll();
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
      duplicates: []
    };

    this.rides.push(ride);

    this.saveAll();

    this.onExpandCollapseRide(this.rides.length - 1);
  }

  onAttemptDeleteAllRides() {
    this.isDeleteAllRidesModalActive = true;
  }

  onCloseDeleteAllRidesModal() {
    this.isDeleteAllRidesModalActive = false;
  }

  onDeleteAllRides() {
    this.onCloseDeleteAllRidesModal();
    this.rides.length = 0;
    this.saveAll();
  }

  onSaveAll() {
    this.saveAll();
  }

  // @Outputs
  onRideDeleted(index: number) { // triggered from child component
    this.rides.splice(index, 1);
    this.rideDuplicateFlaggerService.flag(this.rides);
    this.saveAll();
  }

  onRideTypeChanged() {
    this.rideDuplicateFlaggerService.flag(this.rides);
  }

  onRideUpdated() {
    this.saveAll();
  }

  private saveAll() {
    this.persistenceService.save(this.saveData);
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
