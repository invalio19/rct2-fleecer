import { Component, OnInit, Input } from '@angular/core';
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
  rideTypeOptions: {}[] = [];
  rideAgeOptions: {}[] = [];

  constructor(
    private rideTypeRepositoryService: RideTypeRepositoryService,
    private rideAgeRepositoryService: RideAgeRepositoryService) {
    this.initialiseRideTypeOptions();
    this.initialiseRideAgeOptions();
  }

  ngOnInit(): void {}

  getMaxPriceString(): string {
    return this.convertToCurrencyString(this.ride.maxPrice);
  }

  getMinPriceString(): string {
    return this.convertToCurrencyString(this.ride.minPrice);
  }

  onSelectRideType(id: number): void {
    this.ride.type = this.rideTypeRepositoryService.get(id);
    this.ride.name = this.ride.type.name + ' 1';
  }

  onSelectRideAge(id: number): void {
    this.ride.age = this.rideAgeRepositoryService.get(id);
  }

  onDegradeRideAge() {
    const id = this.ride.age.id;
    if (this.rideAgeRepositoryService.isLastEntry(id)) {
      return;
    }

    this.ride.age = this.rideAgeRepositoryService.get(id + 1);
  }

  private initialiseRideTypeOptions(): void {
    for (const rideType of this.rideTypeRepositoryService.getAll()) {
      this.rideTypeOptions.push({ id: rideType.id, name: rideType.name });
    }
  }

  private initialiseRideAgeOptions(): void {
    for (const rideAge of this.rideAgeRepositoryService.getAll()) {
      this.rideAgeOptions.push({ id: rideAge.id, name: rideAge.name });
    }
  }

  private convertToCurrencyString(val: number): string {
    if (val !== undefined) {
      return '£' + val.toFixed(2);
    }
    return '';
  }
}
