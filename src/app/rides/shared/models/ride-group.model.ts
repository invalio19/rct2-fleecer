import { RidePenalty } from './ride-penalty.model';

export interface RideGroup {
  id: string;
  name: string;
  excitement: number;
  intensity: number;
  nausea: number;
  statRequirements?: { [name: string]: RidePenalty };
}
