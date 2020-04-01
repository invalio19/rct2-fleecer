export class RideAge {
  id: number;
  months: number;
  multiplier: number;
  divisor: number;
  summand: number;
  get name(): string {
    return 'Less than ' + this.months + ' months old'; // TODO: Greater than 200 months
  }

  constructor(id: number, months: number, multiplier: number, divisor: number, summand: number) {
    this.id = id;
    this.months = months;
    this.multiplier = multiplier;
    this.divisor = divisor;
    this.summand = summand;
  }
}
