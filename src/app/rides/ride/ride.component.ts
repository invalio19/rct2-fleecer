import { Component, OnInit, Input } from '@angular/core';
import { Ride } from '../shared/ride.model';
import { RideType } from '../shared/ride-type.model';
import { RideTypeRepositoryService } from '../shared/ride-type-repository.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {
  @Input() ride: Ride;
  rideTypes: RideType[] = this.rideTypeRepositoryService.get();

  constructor(private rideTypeRepositoryService: RideTypeRepositoryService) {}

  ngOnInit(): void {}

  getMaxPriceString(): string {
    if (this.ride.maxPrice) {
      return '£' + this.ride.maxPrice.toFixed(2);
    }
    return '';
  }

  getMinPriceString(): string {
    if (this.ride.minPrice) {
      return '£' + this.ride.minPrice.toFixed(2);
    }
    return '';
  }

  onSelectRideType(): void {
    this.ride.name = this.ride.type.name + ' 1';
  }
}
