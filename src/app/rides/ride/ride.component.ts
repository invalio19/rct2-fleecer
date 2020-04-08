import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ride } from '../shared/models/ride.model';
import { RideAge } from '../shared/enums/ride-age';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';
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

  deleteModalClass = ''; // changes to is-active when clicked
  maxRideRatingValue = 327.67;

  constructor(
    private rideAgeRepositoryService: RideAgeRepositoryService,
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

  onAttemptDelete() {
    this.deleteModalClass = 'is-active';
  }

  onCloseDeleteModal() {
    this.deleteModalClass = '';
  }

  onDelete() {
    this.onCloseDeleteModal();
    this.rideIndexDeleted.emit(this.index);
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
