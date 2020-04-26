import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Park } from '../shared/models/park.model';
import { PersistenceService } from './../shared/services/persistence.service';
import { PriceConverterService } from './../shared/services/price-converter.service';
import { Ride } from '../shared/models/ride.model';
import { RideAge } from '../shared/enums/ride-age';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';
import { RideCalculationParameters } from '../shared/models/ride-calculation-parameters.model';
import { RideDuplicateFlaggerService } from './../shared/services/ride-duplicate-flagger.service';
import { RidePriceCalculatorService } from './../shared/services/ride-price-calculator.service';
import { RideRatings } from './../shared/models/ride-ratings.model';
import { RideService } from './../shared/services/ride.service';
import { RideType } from '../shared/models/ride-type.model';
import { RideTypeRepositoryService } from '../shared/services/ride-type-repository.service';
import { SaveData } from './../shared/models/save-data.model';
import { StatRequirement } from '../shared/models/stat-requirement.modal';
import { StatRequirementConverterService } from './../shared/services/stat-requirement-converter.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html'
})
export class RideComponent implements OnInit {
  @Input() ride: Ride;
  @Input() index: number;
  @Input() saveData: SaveData;
  @Input() isExpanded: boolean;
  @Output() rideExpandToggled = new EventEmitter<number>();

  rideTypeOptions: RideType[];
  rideAgeOptions: { id: number, name: string }[] = [];

  park: Park;
  rides: Ride[];
  isRideDataModalActive = false;
  isDeleteModalActive = false;
  maxRideRatingValue = 327.67;

  constructor(
    private persistenceService: PersistenceService,
    private rideAgeRepositoryService: RideAgeRepositoryService,
    private ridePriceCalculatorService: RidePriceCalculatorService,
    private priceConverterService: PriceConverterService,
    private rideDuplicateFlaggerService: RideDuplicateFlaggerService,
    private rideService: RideService,
    private rideTypeRepositoryService: RideTypeRepositoryService,
    private statRequirementConverterService: StatRequirementConverterService) {
      this.rideTypeOptions = this.rideTypeRepositoryService.getAll();
      this.initialiseRideAgeOptions();
  }

  ngOnInit(): void {
    this.park = this.saveData.parks[0];
    this.rides = this.park.rides;
  }

  onChangeRideName() {
    this.rideDuplicateFlaggerService.flag(this.rides); // TODO: overkill
    this.saveAll();
  }

  getMaxPriceString(ride: Ride): string {
    const rideCalculationParameters: RideCalculationParameters = {
      gameVersion: this.saveData.options.gameVersion,
      parkHasEntranceFee: this.park.hasEntranceFee,
      ride
    };

    const maxPrice = this.ridePriceCalculatorService.max(rideCalculationParameters);
    return this.priceConverterService.ridePrice(maxPrice);
  }

  getMinPriceString(ride: Ride): string {
    const rideCalculationParameters: RideCalculationParameters = {
      gameVersion: this.saveData.options.gameVersion,
      parkHasEntranceFee: this.park.hasEntranceFee,
      ride
    };

    const minPrice = this.ridePriceCalculatorService.min(rideCalculationParameters);
    return this.priceConverterService.ridePrice(minPrice);
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

  canRefurbishRide(ride: Ride) {
    return ride.age !== RideAge.LessThan5Months;
  }

  onClickRefurbishRide(ride: Ride) {
    if (this.canRefurbishRide(ride)) {
      ride.age = RideAge.LessThan5Months;
      this.saveAll();
    }
  }

  canDegradeRideAge(ride: Ride) {
    return ride.age !== RideAge.MoreThan200Months;
  }

  onClickDegradeRideAge(ride: Ride) {
    if (this.canDegradeRideAge(ride)) {
      ride.age++;
      this.saveAll();
    }
  }

  onClickExpandCollapseRide() {
    this.rideExpandToggled.emit(this.index);
  }

  onChangeRideType(id: string): void {
    const oldTypeName = this.rideService.getType(this.ride)?.name;
    this.ride.typeId = id;

    this.updateRideName(oldTypeName);
    this.rideDuplicateFlaggerService.flag(this.rides);

    this.saveAll();
  }

  onChangeRideAge(rideAge: RideAge): void {
    this.ride.age = +rideAge; // always comes through as string

    this.saveAll();
  }

  onChangeRideRating(): void {
    this.saveAll();
  }

  onClickShowRideData(): void {
    this.isRideDataModalActive = true;
  }

  onClickCloseRideDataModal(): void {
    this.isRideDataModalActive = false;
  }

  getRideTypeName(): string {
    return this.rideService.getType(this.ride)?.name;
  }

  getRideGroupStatRequirements(): StatRequirement[] {
    const rideGroup = this.rideService.getGroup(this.ride);
    return rideGroup?.statRequirements;
  }

  hasAnyStatRequirements(): boolean {
    const rideGroup = this.rideService.getGroup(this.ride);
    return rideGroup?.statRequirements !== undefined;
  }

  getHighestDropHeightString(sr: StatRequirement): string {
    if (sr?.highestDropHeight?.value === undefined) {
      return undefined;
    }

    const highestDropHeight = this.statRequirementConverterService.highestDropHeight(sr.highestDropHeight.value);
    return highestDropHeight + 'm';
  }

  getMaxSpeedString(sr: StatRequirement): string {
    if (sr?.maxSpeed?.value === undefined) {
      return undefined;
    }

    const maxSpeed = this.statRequirementConverterService.maxSpeed(sr.maxSpeed.value);
    return maxSpeed + 'km/h';
  }

  getMaxNegativeGsString(sr: StatRequirement): string {
    if (sr?.maxNegativeGs?.value === undefined) {
      return undefined;
    }

    return sr.maxNegativeGs.value.toFixed(2) + 'g';
  }

  getMaxLateralGsString(sr: StatRequirement): string {
    if (sr?.maxLateralGs?.value === undefined) {
      return undefined;
    }

    return sr.maxLateralGs.value.toFixed(2) + 'g';
  }

  getFirstLengthString(sr: StatRequirement): string {
    if (sr?.firstLength?.value === undefined) {
      return undefined;
    }

    const firstLength = this.statRequirementConverterService.firstLength(sr.firstLength.value);
    return firstLength + 'm';
  }

  getShelteredEighthsString(sr: StatRequirement): string {
    if (sr?.shelteredEighths?.value === undefined) {
      return undefined;
    }

    const shelteredEighths = this.statRequirementConverterService.shelteredEighths(sr.shelteredEighths.value);
    return '<' + shelteredEighths + '%';
  }

  showInversionRequirementMessage(sr: StatRequirement): boolean {
    return sr?.highestDropHeight?.ignoredByInversions ||
      sr?.maxNegativeGs?.ignoredByInversions ||
      sr?.numberOfDrops?.ignoredByInversions;
  }

  getPenaltyMessage(penalty: RideRatings): string {
    const rideGroup = this.rideService.getGroup(this.ride);
    if (rideGroup === undefined) {
      return '';
    }

    const e = penalty.excitement;
    const i = penalty.intensity;
    const n = penalty.nausea;

    if ((e === i) &&
        (e === n)) {
          return 'All ratings are divided by ' + e + ' for each unmet requirement';
    }
    else if (e > 1) {
      return 'Excitement is divided by ' + e + ' for each unmet requirement';
    }
    // Don't need to cover intensity and nausea, they either equal excitement or are 1
  }

  onClickAttemptDelete() {
    this.isDeleteModalActive = true;
  }

  onClickCloseDeleteModal() {
    this.isDeleteModalActive = false;
  }

  onClickDelete() {
    this.onClickCloseDeleteModal();
    this.rides.splice(this.index, 1);
    this.rideDuplicateFlaggerService.flag(this.rides);
    this.saveAll();
  }

  private saveAll() {
    this.persistenceService.save(this.saveData);
  }

  private initialiseRideAgeOptions(): void {
    // TODO: this entire method is gross and hacky
    let i = 0;
    for (const rideAgeTableEntry of this.rideAgeRepositoryService.getAll(1)) {
      let rideAgeName = 'Less than ' + rideAgeTableEntry[0] + ' months old'
      if (rideAgeTableEntry[0] === 200 && rideAgeTableEntry[1] === 9) { // EWWW
        rideAgeName = 'More than (or equal to) ' + rideAgeTableEntry[0] + ' months old'
      }
      // 200 months old or more
      this.rideAgeOptions.push({ id: i, name: rideAgeName });
      i++;
    }
  }

  private updateRideName(oldTypeName: string) {
    const name = this.ride.name;
    const regex = new RegExp('^' + oldTypeName + ' \\d+$');
    if (name === undefined || name === '' || regex.test(name)) {
      this.ride.name = this.rideService.getInitialName(this.ride, this.rides);
    }
  }

  private arraySwap(arr: any[], fromIndex: number, toIndex: number): void {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }
}
