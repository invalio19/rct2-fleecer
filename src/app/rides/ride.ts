export interface Ride {
  name: string;
  type: RideType;
  excitement: number;
  intensity: number;
  nausea: number;
  age: AgeBracket;
}

export enum RideType {
  Bobsleigh = 0,
}

export enum AgeBracket {
  LessThan5Months = 0,
  LessThan13Months = 1,
  LessThan40Months = 2
}