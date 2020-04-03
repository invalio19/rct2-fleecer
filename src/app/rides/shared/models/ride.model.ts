import { RideType } from './ride-type.model';
import { RideAge } from './ride-age.model';

export class Ride {
  name: string;
  type: RideType;
  age: RideAge;
  excitement: number;
  intensity: number;
  nausea: number;
  isDuplicate: boolean;
  get maxPrice(): number {
    let ridePrice = this.calculateBaseRidePrice();
    if (ridePrice === undefined) {
      return undefined;
    }

    ridePrice *= 2;
    ridePrice -= 1; // Minus 10p to get maximum price guests will pay
    ridePrice = Math.max(0, ridePrice); // Above step could bring this to -10p
    ridePrice = Math.min(200, ridePrice); // Cap at £20
    ridePrice /= 10;

    return ridePrice;
  };
  get minPrice(): number {
    let ridePrice = this.calculateBaseRidePrice();
    if (ridePrice === undefined) {
      return undefined;
    }

    ridePrice = Math.floor(ridePrice / 2);
    ridePrice /= 10;

    return ridePrice;
  }

  private calculateBaseRidePrice(): number {
    if (this.type === undefined) {
      return undefined;
    }

    // tslint:disable:no-bitwise
    let ridePrice =
      ((this.excitement * 100 * this.type.excitement * 32) >> 15) +
      ((this.intensity * 100 * this.type.intensity * 32) >> 15) +
      ((this.nausea * 100 * this.type.nausea * 32) >> 15);
    // tslint:enable:no-bitwise

    ridePrice *= this.age.multiplier; // todo move age to enum in a lookup table
    ridePrice = Math.floor(ridePrice / this.age.divisor);
    ridePrice += this.age.summand;

    if (this.isDuplicate) {
      ridePrice -= Math.floor(ridePrice / 4);
    }

    return ridePrice;
  }
}
