export enum RideAge {
  LessThan5Months = 0,
  LessThan13Months = 1,
  LessThan40Months = 2,
  LessThan64Months = 3,
  LessThan88Months = 4,
  LessThan104Months = 5,
  LessThan120Months = 6,
  LessThan128Months = 7,
  LessThan200Months = 8,
  MoreThan200Months = 9
}

export class Ride {
  id: number;
  name: string;
  type: string;
  age: RideAge;
  excitement: number;
  intensity: number;
  nausea: number;
  isDuplicate: boolean;

  constructor() {
    // Don't initialise id, this is sorted out by IndexedDB
    this.name = '';
    this.type = undefined;
    this.age = RideAge.LessThan5Months;
    this.excitement = undefined;
    this.intensity = undefined;
    this.nausea = undefined;
    this.isDuplicate = false;
  }
}