import { Injectable } from '@angular/core';

import { UnitConverterService } from './unit-converter.service';

@Injectable({
  providedIn: 'root'
})
export class StatRequirementConverterService {
  constructor(private unitConverterService: UnitConverterService) {}

  highestDropHeight(value: number): number {
    // To metres
    return Math.floor(value * 3 / 4);
  }

  maxSpeed(value: number): number {
    // To miles per hour
    // tslint:disable-next-line: no-bitwise
    const mph = (value * 9) >> 18;
    return this.unitConverterService.mphToKmph(mph);
  }

  firstLength(value: number): number {
    // To metres
    // tslint:disable-next-line: no-bitwise
    return value >> 16;
  }

  shelteredEighths(value: number) {
    return value * 12.5;
  }
}
