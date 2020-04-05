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

export interface Ride {
  name: string;
  type: string;
  age: RideAge;
  excitement: number;
  intensity: number;
  nausea: number;
  isDuplicate: boolean;
}