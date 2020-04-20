import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ride } from '../shared/models/ride.model';
import { RideAge } from '../shared/enums/ride-age';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';
import { RideGroup } from '../shared/models/ride-group.model';
import { RideGroupRepositoryService } from '../shared/services/ride-group-repository.service';
import { RidePenaltyConverterService } from './../shared/services/ride-penalty-converter.service';
import { RideType } from '../shared/models/ride-type.model';
import { RideTypeRepositoryService } from '../shared/services/ride-type-repository.service';

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
    private ridePenaltyConverterService: RidePenaltyConverterService,
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

  onChangeRideRating() {
    this.rideUpdated.emit();
  }

  onClickShowRideData() {
    this.isRideDataModalActive = true;
  }

  onClickCloseRideDataModal() {
    this.isRideDataModalActive = false;
  }

  hasAnyStatRequirements(): boolean {
    const rideGroup = this.getRideGroup();
    return rideGroup?.statRequirements !== undefined;
  }

  hasStatRequirement(property: string): boolean {
    const rideGroup = this.getRideGroup();
    return rideGroup?.statRequirements[property] !== undefined;
  }

  getStatRequirement(property: string): string {
    const showInGs = ['maxNegativeGs', 'maxLateralGs'].includes(property);
    const showInMetres = ['highestDropHeight', 'firstLength'].includes(property);
    const showInKmph = ['maxSpeed'].includes(property);

    const rideGroup = this.getRideGroup();
    const baseValue = rideGroup?.statRequirements[property]?.value;
    if (baseValue !== undefined) {
      let value: number;

      if (showInMetres || showInKmph) {
        value = this.ridePenaltyConverterService[property](baseValue);
      }
      else {
        value = baseValue;
      }

      // TODO This is smelly
      if (showInMetres) return value + 'm';
      if (showInKmph) return value + 'km/h';
      if (showInGs) return value.toFixed(2) + 'g';
      return value.toString();
    }
    return undefined;
  }

  getPenaltyMessage(property: string) {
    const rideGroup = this.getRideGroup();
    const excitement = rideGroup.statRequirements[property].excitement;
    const intensity = rideGroup.statRequirements[property].intensity;
    const nausea = rideGroup.statRequirements[property].nausea;

    if ((excitement === intensity) &&
        (excitement === nausea)) {
          return 'Penalty: All ratings divided by ' + excitement;
    }
    if (excitement > 1) {
      return 'Penalty: Excitement divided by ' + excitement;
    }
    if (intensity > 1) {
      return 'Penalty: Intensity divided by ' + intensity;
    }
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
