import { RideRatings } from './../shared/models/ride-ratings.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ride } from '../shared/models/ride.model';
import { RideAge } from '../shared/enums/ride-age';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';
import { RideGroup } from '../shared/models/ride-group.model';
import { RideGroupRepositoryService } from '../shared/services/ride-group-repository.service';
import { RideType } from '../shared/models/ride-type.model';
import { RideTypeRepositoryService } from '../shared/services/ride-type-repository.service';
import { StatRequirement } from '../shared/models/stat-requirement.modal';
import { StatRequirementConverterService } from './../shared/services/stat-requirement-converter.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html'
})
export class RideComponent implements OnInit {
  @Input() ride: Ride;
  @Input() index: number;
  @Output() rideIndexDeleted = new EventEmitter<number>();
  @Output() rideTypeChanged = new EventEmitter();
  @Output() rideUpdated = new EventEmitter();

  rideTypeOptions: RideType[];
  rideAgeOptions: { id: number, name: string }[] = [];

  isRideDataModalActive = false;
  isDeleteModalActive = false;
  maxRideRatingValue = 327.67;

  constructor(
    private rideAgeRepositoryService: RideAgeRepositoryService,
    private rideGroupRepositoryService: RideGroupRepositoryService,
    private statRequirementConverterService: StatRequirementConverterService,
    private rideTypeRepositoryService: RideTypeRepositoryService) {
      this.rideTypeOptions = this.rideTypeRepositoryService.getAll();
      this.initialiseRideAgeOptions();
  }

  ngOnInit(): void {}

  getRideDuplicatesString(): string {
    return this.ride.duplicates.join(', ');
  }

  onSelectRideType(id: string): void {
    const oldName = this.ride.name;
    let oldTypeName: string;
    if (this.ride.typeId !== undefined) {
      const oldRideType = this.rideTypeRepositoryService.get(this.ride.typeId);
      oldTypeName = oldRideType.name;
    }

    this.ride.typeId = id;

    this.updateRideName(oldName, oldTypeName);

    this.rideTypeChanged.emit();
    this.rideUpdated.emit();
  }

  onSelectRideAge(rideAge: RideAge): void {
    this.ride.age = +rideAge; // always comes through as string

    this.rideUpdated.emit();
  }

  onChangeRideRating(): void {
    this.rideUpdated.emit();
  }

  onClickShowRideData(): void {
    this.isRideDataModalActive = true;
  }

  onClickCloseRideDataModal(): void {
    this.isRideDataModalActive = false;
  }

  getRideTypeName(): string {
    if (this.ride.typeId !== undefined) {
      return this.rideTypeRepositoryService.get(this.ride.typeId).name;
    }
  }

  getRideGroupStatRequirements(): StatRequirement[] {
    const rideGroup = this.getRideGroup();
    return rideGroup?.statRequirements;
  }

  hasAnyStatRequirements(): boolean {
    const rideGroup = this.getRideGroup();
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
    const rideGroup = this.getRideGroup();
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

  onDelete() {
    this.onClickCloseDeleteModal();
    this.rideIndexDeleted.emit(this.index);
  }

  private getRideGroup(): RideGroup {
    if (this.ride.typeId !== undefined) {
      const rideType = this.rideTypeRepositoryService.get(this.ride.typeId);
      if (rideType !== undefined) {
        const rideGroup = this.rideGroupRepositoryService.get(rideType.groupId);
        return rideGroup;
      }
    }
    return undefined;
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

  private updateRideName(oldName: string, oldTypeName: string) {
    // TODO: number increments based on other rides
    const regex = new RegExp('^' + oldTypeName + ' \\d+$');
    const rideType = this.rideTypeRepositoryService.get(this.ride.typeId);
    const defaultRideName = rideType.name + ' 1';
    if (this.ride.name === undefined || this.ride.name === '' || regex.test(oldName)) {
      this.ride.name = defaultRideName;
    }
  }
}
