import { AdmissionMode } from './park.model';
import { GameVersion } from './../enums/game-version';
import { Ride } from '../models/ride.model';

export interface RideCalculationParameters {
  gameVersion: GameVersion;
  parkAdmissionMode: AdmissionMode;
  ride: Ride;
}
