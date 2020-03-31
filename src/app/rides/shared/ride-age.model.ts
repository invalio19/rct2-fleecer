export class RideAge {
  months: number;
  multiplier: number;
  divisor: number;
  summand: number;

  constructor(months: number, multiplier: number, divisor: number, summand: number) {
    this.months = months;
    this.multiplier = multiplier;
    this.divisor = divisor;
    this.summand = summand;
  }
}
