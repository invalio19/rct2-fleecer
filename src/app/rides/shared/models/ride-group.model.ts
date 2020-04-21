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
  statRequirements?: StatRequirements;
  standardPenalty?: StandardPenalty;
  specialStatRequirements?: SpecialStatRequirements;
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

interface StatRequirements {
  highestDropHeight?: StatRequirementValue;
  maxSpeed?: StatRequirementValue;
  maxNegativeGs?: StatRequirementValue;
  maxLateralGs?: StatRequirementValue;
  firstLength?: StatRequirementValue;
  numberOfDrops?: StatRequirementValue;
}

interface StatRequirementValue {
  value: number;
  ignoredByInversions?: boolean;
}

interface StandardPenalty {
  excitement: number;
  intensity: number;
  nausea: number;
}

interface SpecialStatRequirements {
  shelteredEighths?: SpecialStatRequirementValue;
  numberOfInversions?: SpecialStatRequirementValue;
  numberOfHoles?: SpecialStatRequirementValue;
  numberOfReversers?: SpecialStatRequirementValue;
  numberOfWaterElements?: SpecialStatRequirementValue;
}

interface SpecialStatRequirementValue {
  value: number
  excitement: number;
  intensity: number;
  nausea: number;
}
