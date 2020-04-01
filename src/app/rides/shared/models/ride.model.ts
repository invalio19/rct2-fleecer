import { RideType } from './ride-type.model';
import { RideAge } from './ride-age.model';

export class Ride {
  name: string;
  type: RideType;
  excitement: number;
  intensity: number;
  nausea: number;
  age: RideAge;
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

  constructor() {
    this.name = undefined;
    this.type = undefined;
    this.age = undefined;
    this.excitement = 0;
    this.intensity = 0;
    this.nausea = 0;
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

    ridePrice *= this.age.multiplier;
    ridePrice = Math.floor(ridePrice / this.age.divisor);
    ridePrice += this.age.summand;

    return ridePrice;
  }
}
