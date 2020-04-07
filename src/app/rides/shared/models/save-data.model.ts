import { GameVersion } from './../enums/game-version';
import { Ride } from './ride.model';

export interface SaveData {
  name: string;
  gameVersion: GameVersion;
  hasEntranceFee: boolean;
  showGoodValuePrice: boolean;
  rides: Ride[];
}