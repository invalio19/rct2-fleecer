import { Ride } from './ride.model';

export interface Park {
  name: string;
  hasEntranceFee: boolean;
  showGoodValuePrice: boolean;
  rides: Ride[];
}
