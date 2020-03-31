import { RideType } from './ride-type.model';

export enum AgeBracket {
  LessThan5Months = 0,
  LessThan13Months = 1,
  LessThan40Months = 2
}

export class Ride {
  name: string;
  type: RideType;
  excitement: number;
  intensity: number;
  nausea: number;
  age: AgeBracket;
  get maxPrice(): number {
    if (this.type === undefined) {
      return undefined;
    }

    // tslint:disable:no-bitwise
    let ridePrice =
      ((this.excitement * 100 * this.type.excitement * 32) >> 15) +
      ((this.intensity * 100 * this.type.intensity * 32) >> 15) +
      ((this.nausea * 100 * this.type.nausea * 32) >> 15);
    // tslint:enable:no-bitwise

    ridePrice += 30;
    ridePrice *= 2;
    ridePrice -= 1; // Minus 10p to get maximum price guests will pay
    ridePrice /= 10;

    return ridePrice;
  }

  constructor(ride?: Ride) {
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
      this.age = AgeBracket.LessThan5Months;
    }
  }
}
