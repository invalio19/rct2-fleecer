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
    if (!ridePrice) {
      return undefined;
    }

    ridePrice *= 2;
    ridePrice -= 1; // Minus 10p to get maximum price guests will pay
    ridePrice /= 10;

    return ridePrice;
  };
  get minPrice(): number {
    let ridePrice = this.calculateBaseRidePrice();
    if (!ridePrice) {
      return undefined;
    }

    ridePrice = Math.floor(ridePrice / 2);
    ridePrice /= 10;

    return ridePrice;
  }

  constructor(
    ride?: Ride) {
    if (ride) {
      this.name = ride.name;
      this.type = ride.type; // TODO: new RideType(); -- from array so no copies
      this.excitement = ride.excitement;
      this.intensity = ride.intensity;
      this.nausea = ride.nausea;
      this.age = ride.age;
    }
    else {
      this.name = '';
      this.type = undefined;
      this.excitement = 0;
      this.intensity = 0;
      this.nausea = 0;
      this.age = undefined;
    }
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
