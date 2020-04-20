import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RidePenaltyConverterService {
  highestDropHeight(value: number): number {
    // To metres
    return Math.floor(value * 3 / 4);
  }

  maxSpeed(value: number): number {
    // To miles per hour // TODO convert to metric
    // tslint:disable-next-line: no-bitwise
    return (value * 9) >> 18;
  }
}
