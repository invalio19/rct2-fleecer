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

  rideTypeOptions: RideType[];
  rideAgeOptions: { id: number, name: string }[] = [];

  deleteModalClass = ''; // changes to is-active when clicked todo is this really needed
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
    this.rideTypeChanged.emit();

    this.updateRideName(oldName, oldTypeName);
  }

  onSelectRideAge(rideAge: RideAge): void {
    this.ride.age = +rideAge; // always comes through as string
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
    let i = 0; // todo
    for (const rideAgeTableEntry of this.rideAgeRepositoryService.getAll(1)) { // todo
      const rideAgeName = 'Less than ' + rideAgeTableEntry[0] + ' months old' // todo
      // 200 months old or more
      this.rideAgeOptions.push({ id: i, name: rideAgeName });
      i++;
    }
  }

  private updateRideName(oldName: string, oldTypeName: string) {
    // TODO: change name automatically if it's a default name of another ride type
    // TODO: number increments based on other rides
    const regex = new RegExp('^' + oldTypeName + ' \\d+$');
    const rideType = this.rideTypeRepositoryService.get(this.ride.typeId);
    const defaultRideName = rideType.name + ' 1';
    if (this.ride.name === undefined || this.ride.name === '' || regex.test(oldName)) {
      this.ride.name = defaultRideName;
    }
  }
}