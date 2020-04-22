import { RideRatings } from './ride-ratings.model';

export interface StatRequirement {
  highestDropHeight?: StatRequirementValue;
  maxSpeed?: StatRequirementValue;
  maxNegativeGs?: StatRequirementValue;
  maxLateralGs?: StatRequirementValue;
  firstLength?: StatRequirementValue;
  numberOfDrops?: StatRequirementValue;
  shelteredEighths?: StatRequirementValue;
  numberOfInversions?: StatRequirementValue;
  numberOfHoles?: StatRequirementValue;
  numberOfReverserElements?: StatRequirementValue;
  numberOfWaterElements?: StatRequirementValue;
  penalty: RideRatings;
}

interface StatRequirementValue {
  value: number;
  ignoredByInversions?: boolean;
}
