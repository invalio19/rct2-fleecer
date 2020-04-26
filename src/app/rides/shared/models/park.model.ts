import { Ride } from './ride.model';

export interface Park {
  name: string;
  admissionMode: AdmissionMode;
  showGoodValuePrice: boolean;
  rides: Ride[];
  // Legacy
  hasEntranceFee?: boolean;
}

export enum AdmissionMode {
  FreeParkEntryPayPerRide = 0,
  PayToEnterParkFreeRides = 1,
  PayToEnterParkPayPerRide = 2
}