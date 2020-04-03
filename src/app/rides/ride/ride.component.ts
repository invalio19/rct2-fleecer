import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ride } from '../shared/models/ride.model';
import { RideTypeRepositoryService } from '../shared/services/ride-type-repository.service';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {
  @Input() ride: Ride;
  @Input() index: number;
  @Output() rideIndexDeleted = new EventEmitter<number>();

  rideTypeOptions: {}[] = [];
  rideAgeOptions: {}[] = [];

  deleteModalClass = ''; // changes to is-active when clicked

  constructor(
    private rideTypeRepositoryService: RideTypeRepositoryService,
    private rideAgeRepositoryService: RideAgeRepositoryService) {
    this.initialiseRideTypeOptions();
    this.initialiseRideAgeOptions();
  }

  ngOnInit(): void {}

  onSelectRideType(id: string): void {
    this.ride.type = this.rideTypeRepositoryService.get(id);
    this.updateRideName();
  }

  onSelectRideAge(id: number): void {
    this.ride.age = this.rideAgeRepositoryService.get(id);
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
    for (const rideAge of this.rideAgeRepositoryService.getAll()) {
      this.rideAgeOptions.push({ id: rideAge.id, name: rideAge.name });
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
