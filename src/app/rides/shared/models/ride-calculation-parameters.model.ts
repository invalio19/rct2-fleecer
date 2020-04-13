import { GameVersion } from './../enums/game-version';
import { Ride } from '../models/ride.model';

export interface RideCalculationParameters {
  gameVersion: GameVersion;
  parkHasEntranceFee: boolean;
  ride: Ride;
}
