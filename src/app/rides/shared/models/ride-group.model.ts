import { StatRequirement } from './stat-requirement.modal';

export interface RideGroup {
  id: string;
  name: string;
  excitement: number;
  intensity: number;
  nausea: number;
  unreliability: number;
  baseRatings: BaseRatings[];
  synchronisationBonus?: SynchronisationBonus;
  shelteredEighths?: number;
  statRequirements?: StatRequirement[];
}

interface BaseRatings {
  mode?: string;
  excitement: number;
  intensity: number;
  nausea: number;
}

interface SynchronisationBonus {
  excitement: number;
  intensity: number;
}
