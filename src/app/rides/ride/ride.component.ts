import { Component, OnInit } from '@angular/core';
import { Ride, AgeBracket } from '../ride';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {
  ride: Ride = {
    name: 'ten',
    type: undefined,
    excitement: 0,
    intensity: 0,
    nausea: 0,
    age: AgeBracket.LessThan5Months
  };

  constructor() { }

  ngOnInit(): void {
  }

  onClickIncreaseNausea(val: number): void {
    const newNausea = +(this.ride.nausea + val).toFixed(2); // Get around JS floating point issues
    this.ride.nausea = Math.max(0, newNausea);
  }
}
