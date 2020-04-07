import { RideAge } from '../enums/ride-age';

export interface Ride {
  name: string;
  typeId: string;
  age: RideAge;
  excitement: number;
  intensity: number;
  nausea: number;
  isDuplicate: boolean;
}