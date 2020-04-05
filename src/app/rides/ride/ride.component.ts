import { RideAge } from './../shared/models/ride.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ride } from '../shared/models/ride.model';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';
import { RideTypeRepositoryService } from '../shared/services/ride-type-repository.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {
  @Input() ride: Ride;
  @Input() index: number;
  @Output() rideIndexDeleted = new EventEmitter<number>();
  @Output() rideTypeChanged = new EventEmitter();

  rideTypeOptions: { id: string, name: string }[] = [];
  rideAgeOptions: { id: number, name: string }[] = [];

  deleteModalClass = ''; // changes to is-active when clicked todo is this really needed

  constructor(
    private rideAgeRepositoryService: RideAgeRepositoryService,
    private rideTypeRepositoryService: RideTypeRepositoryService) {
    this.initialiseRideTypeOptions();
    this.initialiseRideAgeOptions();
  }

  ngOnInit(): void {}

  onSelectRideType(id: string): void {
    this.ride.type = this.rideTypeRepositoryService.get(id);
    this.rideTypeChanged.emit();

    this.updateRideName();
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

  private initialiseRideTypeOptions(): void {
    this.rideTypeOptions = this.rideTypeRepositoryService.getIdNamePairsSortedByName();
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

  private updateRideName() {
    // TODO: change name automatically if it's a default name of another ride type
    // TODO: number increments based on other rides
    const defaultRideName = this.ride.type.name + ' 1';
    if (this.ride.name === undefined || this.ride.name === '') {
      this.ride.name = defaultRideName;
    }
  }
}
