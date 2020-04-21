import { RideGroup } from './../rides/shared/models/ride-group.model';

export const RideGroupData: { [key: string]: RideGroup } = {
  '3dCinema': {
    id: '3dCinema',
    name: '3D Cinema',
    excitement: 20,
    intensity: 10,
    nausea: 0,
    unreliability: 19,
    baseRatings: [
      { mode: '3D film: "Mouse tails"', excitement: 3.50, intensity: 2.40, nausea: 1.40 },
      { mode: '3D film: "Storm chasers"', excitement: 4.00, intensity: 2.65, nausea: 1.55 },
      { mode: '3D film: "Space raiders"', excitement: 4.20, intensity: 2.60, nausea: 1.48 },
    ],
    shelteredEighths: 7
  },
  airPoweredVerticalCoaster: {
    id: 'airPoweredVerticalCoaster',
    name: 'Air Powered Vertical Coaster',
    excitement: 44,
    intensity: 66,
    nausea: 10,
    unreliability: 28,
    baseRatings: [{ excitement: 4.13, intensity: 2.50, nausea: 2.80 }],
    synchronisationBonus: { excitement: 0.60, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 34 },
    },
    standardPenalty: { excitement: 2, intensity: 1, nausea: 1 }
  },
  boatHire: {
    id: 'boatHire',
    name: 'Boat Hire',
    excitement: 70,
    intensity: 6,
    nausea: 0,
    unreliability: 7,
    baseRatings: [{ excitement: 1.90, intensity: 0.80, nausea: 0.90 }]
    // TODO: without circuit
  },
  bobsleighCoaster: {
    id: 'bobsleighCoaster',
    name: 'Bobsleigh Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 16,
    baseRatings: [{ excitement: 2.80, intensity: 3.20, nausea: 2.50 }],
    synchronisationBonus: { excitement: 0.20, intensity: 0.00 },
    statRequirements: {
      maxSpeed: { value: 0xC0000 },
      maxLateralGs: { value: 1.20 },
      firstLength: { value: 0x1720000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  carRide: {
    id: 'carRide',
    name: 'Car Ride',
    excitement: 70,
    intensity: 10,
    nausea: 10,
    unreliability: 12,
    baseRatings: [{ excitement: 2.00, intensity: 0.50, nausea: 0.00 }],
    synchronisationBonus: { excitement: 0.15, intensity: 0.00 },
    statRequirements: {
      firstLength: { value: 0xC80000 },
    },
    standardPenalty: { excitement: 8, intensity: 2, nausea: 2 } // todo
  },
  chairlift: {
    id: 'chairlift',
    name: 'Chairlift',
    excitement: 70,
    intensity: 10,
    nausea: 0,
    unreliability: 14, // TODO plus ride speed
    baseRatings: [{ excitement: 1.60, intensity: 0.40, nausea: 0.50 }],
    statRequirements: {
      firstLength: { value: 0x960000 },
    }, // TODO num of stations
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 },
    specialStatRequirements: {
      shelteredEighths: { value: 4, excitement: 4, intensity: 1, nausea: 1 },
    },
  },
  circus: {
    id: 'circus',
    name: 'Circus',
    excitement: 20,
    intensity: 10,
    nausea: 0,
    unreliability: 9,
    baseRatings: [{ excitement: 2.10, intensity: 0.30, nausea: 0.00 }],
    shelteredEighths: 7
  },
  compactInvertedCoaster: {
    id: 'compactInvertedCoaster',
    name: 'Compact Inverted Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 21, // TODO 31 in reverse incline launched shuttle mode
    baseRatings: [{ excitement: 3.15, intensity: 2.80, nausea: 3.20 }],
    synchronisationBonus: { excitement: 0.42, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 12, ignoredByInversions: true },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.30, ignoredByInversions: true },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  corkscrewRollerCoaster: {
    id: 'corkscrewRollerCoaster',
    name: 'Corkscrew Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 16,
    baseRatings: [{ excitement: 3.00, intensity: 0.50, nausea: 0.20 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 12, ignoredByInversions: true },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.40, ignoredByInversions: true },
      numberOfDrops: { value: 2, ignoredByInversions: true },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  crookedHouse: {
    id: 'crookedHouse',
    name: 'Crooked House',
    excitement: 15,
    intensity: 8,
    nausea: 0,
    unreliability: 5,
    baseRatings: [{ excitement: 2.15, intensity: 0.62, nausea: 0.34 }],
    shelteredEighths: 7
  },
  dinghySlide: {
    id: 'dinghySlide',
    name: 'Dinghy Slide',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 13,
    baseRatings: [{ excitement: 2.70, intensity: 2.00, nausea: 1.50 }],
    synchronisationBonus: { excitement: 0.50, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 12 },
      maxSpeed: { value: 0x70000 },
      firstLength: { value: 0x8C0000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  dodgems: {
    id: 'dodgems',
    name: 'Dodgems',
    excitement: 40,
    intensity: 20,
    nausea: 0,
    unreliability: 16,
    baseRatings: [{ excitement: 1.30, intensity: 0.50, nausea: 0.35 }], // TODO add ratings if num_vehicles is at least 4
    shelteredEighths: 7
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    excitement: 50,
    intensity: 10,
    nausea: 0,
    unreliability: 22,
    baseRatings: [{ excitement: 3.60, intensity: 4.55, nausea: 5.72 }],
    shelteredEighths: 3
    // TODO base ratings added to
  },
  ferrisWheel: {
    id: 'ferrisWheel',
    name: 'Ferris Wheel',
    excitement: 60,
    intensity: 20,
    nausea: 10,
    unreliability: 16,
    baseRatings: [{ excitement: 0.60, intensity: 0.25, nausea: 0.30 }], // TODO plus rotations
    shelteredEighths: 0
  },
  flyingRollerCoaster: {
    id: 'flyingRollerCoaster',
    name: 'Flying Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 17,
    baseRatings: [{ excitement: 4.35, intensity: 1.85, nausea: 4.33 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.40, ignoredByInversions: true },
      numberOfDrops: { value: 2 },
    },
    standardPenalty: { excitement: 2, intensity: 1, nausea: 1 },
    specialStatRequirements: {
      numberOfInversions: { value: 1, excitement: 2, intensity: 1, nausea: 1 },
    }
  },
  flyingSaucers: {
    id: 'flyingSaucers',
    name: 'Flying Saucers',
    excitement: 50,
    intensity: 25,
    nausea: 0,
    unreliability: 32,
    baseRatings: [{ excitement: 2.40, intensity: 0.55, nausea: 0.39 }], // todo plus vehicles, time limit
    shelteredEighths: 0
  },
  ghostTrain: {
    id: 'ghostTrain',
    name: 'Ghost Train',
    excitement: 70,
    intensity: 10,
    nausea: 10,
    unreliability: 12,
    baseRatings: [{ excitement: 2.00, intensity: 0.20, nausea: 0.03 }],
    synchronisationBonus: { excitement: 0.15, intensity: 0.00 },
    statRequirements: {
      firstLength: { value: 0xB40000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  gigaCoaster: {
    id: 'gigaCoaster',
    name: 'Giga Coaster',
    excitement: 51,
    intensity: 32,
    nausea: 10,
    unreliability: 14,
    baseRatings: [{ excitement: 3.85, intensity: 0.40, nausea: 0.35 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 16, ignoredByInversions: true },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.40, ignoredByInversions: true },
      numberOfDrops: { value: 2, ignoredByInversions: true },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  goKarts: {
    id: 'goKarts',
    name: 'Go-Karts',
    excitement: 120,
    intensity: 20,
    nausea: 0,
    unreliability: 16,
    baseRatings: [{ excitement: 1.42, intensity: 1.73, nausea: 0.40 }], // todo plus laps etc.
    specialStatRequirements: {
      shelteredEighths: { value: 6, excitement: 2, intensity: 1, nausea: 1 },
    }
  },
  hauntedHouse: {
    id: 'hauntedHouse',
    name: 'Haunted House',
    excitement: 20,
    intensity: 10,
    nausea: 0,
    unreliability: 8,
    baseRatings: [{ excitement: 3.41, intensity: 1.53, nausea: 0.10 }],
    shelteredEighths: 7
  },
  heartlineTwisterCoaster: {
    id: 'heartlineTwisterCoaster',
    name: 'Heartline Twister Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 18,
    baseRatings: [{ excitement: 1.40, intensity: 1.70, nausea: 1.65 }],
    synchronisationBonus: { excitement: 0.20, intensity: 0.04 },
    statRequirements: {
      numberOfDrops: { value: 1 },
    },
    standardPenalty: { excitement: 4, intensity: 1, nausea: 1 },
    specialStatRequirements: {
      numberOfInversions: { value: 1, excitement: 4, intensity: 1, nausea: 1 },
    }
  },
  invertedHairpinCoaster: {
    id: 'invertedHairpinCoaster',
    name: 'Inverted Hairpin Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 30,
    unreliability: 14,
    baseRatings: [{ excitement: 3.00, intensity: 2.65, nausea: 2.25 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.8 },
    statRequirements: {
      highestDropHeight: { value: 8 },
      maxSpeed: { value: 0x70000 },
      maxNegativeGs: { value: 0.10 },
      maxLateralGs: { value: 1.50 },
      firstLength: { value: 0xAA0000 },
      numberOfDrops: { value: 3 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  invertedImpulseCoaster: {
    id: 'invertedImpulseCoaster',
    name: 'Inverted Impulse Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 20,
    baseRatings: [{ excitement: 4.00, intensity: 3.00, nausea: 3.20 }],
    synchronisationBonus: { excitement: 0.42, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 20 },
      maxSpeed: { value: 0xA0000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  invertedRollerCoaster: {
    id: 'invertedRollerCoaster',
    name: 'Inverted Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 17,
    baseRatings: [{ excitement: 3.60, intensity: 2.80, nausea: 3.20 }],
    synchronisationBonus: { excitement: 0.42, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 12, ignoredByInversions: true },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.30, ignoredByInversions: true },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  juniorRollerCoaster: {
    id: 'juniorRollerCoaster',
    name: 'Junior Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 13,
    baseRatings: [{ excitement: 2.40, intensity: 2.50, nausea: 1.80 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 6 },
      maxSpeed: { value: 0x70000 },
      numberOfDrops: { value: 1 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  launchedFreefall: {
    id: 'launchedFreefall',
    name: 'Launched Freefall',
    excitement: 50,
    intensity: 50,
    nausea: 10,
    unreliability: 16,
    baseRatings: [{ excitement: 2.70, intensity: 3.00, nausea: 3.50 }], // todo ratings plus
  },
  layDownRollerCoaster: {
    id: 'layDownRollerCoaster',
    name: 'Lay-down Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 18,
    baseRatings: [{ excitement: 3.85, intensity: 1.15, nausea: 2.75 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.40, ignoredByInversions: true },
      numberOfDrops: { value: 2, ignoredByInversions: true },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 },
    specialStatRequirements: {
      numberOfInversions: { value: 1, excitement: 4, intensity: 2, nausea: 2 }
    }
  },
  lift: {
    id: 'lift',
    name: 'Lift',
    excitement: 80,
    intensity: 10,
    nausea: 0,
    unreliability: 15,
    baseRatings: [{ excitement: 1.11, intensity: 0.35, nausea: 0.30 }],
    shelteredEighths: 7,
    specialStatRequirements: {
      shelteredEighths: { value: 5, excitement: 4, intensity: 1, nausea: 1 }
    }
  },
  limLaunchedRollerCoaster: {
    id: 'limLaunchedRollerCoaster',
    name: 'LIM Launched Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 25,
    baseRatings: [{ excitement: 2.90, intensity: 1.50, nausea: 2.20 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 10, ignoredByInversions: true },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 10, ignoredByInversions: true },
      numberOfDrops: { value: 2, ignoredByInversions: true },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  logFlume: {
    id: 'logFlume',
    name: 'Log Flume',
    excitement: 80,
    intensity: 34,
    nausea: 6,
    unreliability: 15,
    baseRatings: [{ excitement: 1.50, intensity: 0.55, nausea: 0.30 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 2 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  loopingRollerCoaster: {
    id: 'loopingRollerCoaster',
    name: 'Looping Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 15, // todo powered launch = 20
    baseRatings: [{ excitement: 3.00, intensity: 0.50, nausea: 0.20 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 14, ignoredByInversions: true },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.10, ignoredByInversions: true },
      numberOfDrops: { value: 2, ignoredByInversions: true },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  magicCarpet: {
    id: 'magicCarpet',
    name: 'Magic Carpet',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 16,
    baseRatings: [{ excitement: 2.45, intensity: 1.60, nausea: 2.60 }], // todo plus
    shelteredEighths: 0
  },
  maze: {
    id: 'maze',
    name: 'Maze',
    excitement: 50,
    intensity: 0,
    nausea: 0,
    unreliability: 8,
    baseRatings: [{ excitement: 1.30, intensity: 0.50, nausea: 0.00 }], // todo plus
    shelteredEighths: 0
  },
  merryGoRound: {
    id: 'merryGoRound',
    name: 'Merry-Go-Round',
    excitement: 50,
    intensity: 10,
    nausea: 0,
    unreliability: 16,
    baseRatings: [{ excitement: 0.60, intensity: 0.15, nausea: 0.30 }], // todo plus rotations
    shelteredEighths: 7
  },
  mineRide: {
    id: 'mineRide',
    name: 'Mine Ride',
    excitement: 60,
    intensity: 20,
    nausea: 10,
    unreliability: 16,
    baseRatings: [{ excitement: 2.75, intensity: 1.00, nausea: 1.80 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      firstLength: { value: 0x10E0000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  mineTrainCoaster: {
    id: 'mineTrainCoaster',
    name: 'Mine Train Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 16,
    baseRatings: [{ excitement: 2.90, intensity: 2.30, nausea: 2.10 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 8 },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.10 },
      firstLength: { value: 0x1720000 },
      numberOfDrops: { value: 2 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  miniGolf: {
    id: 'miniGolf',
    name: 'Mini Golf',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 0,
    baseRatings: [{ excitement: 1.50, intensity: 0.90, nausea: 0.00 }], // todo plus
    specialStatRequirements: {
      numberOfHoles: { value: 1, excitement: 8, intensity: 2, nausea: 2 }, // todo
    }
  },
  miniHelicopters: {
    id: 'miniHelicopters',
    name: 'Mini Helicopters',
    excitement: 70,
    intensity: 10,
    nausea: 10,
    unreliability: 12,
    baseRatings: [{ excitement: 1.60, intensity: 0.40, nausea: 0.00 }],
    synchronisationBonus: { excitement: 0.15, intensity: 0.00 },
    shelteredEighths: 6,
    statRequirements: {
      firstLength: { value: 0xA00000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  miniRollerCoaster: {
    id: 'miniRollerCoaster',
    name: 'Mini Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 13,
    baseRatings: [{ excitement: 2.55, intensity: 2.40, nausea: 1.85 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 12 },
      maxSpeed: { value: 0x70000 },
      maxNegativeGs: { value: 0.50 },
      numberOfDrops: { value: 2 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  miniSuspendedCoaster: {
    id: 'miniSuspendedCoaster',
    name: 'Mini Suspended Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 15,
    baseRatings: [{ excitement: 2.80, intensity: 2.50, nausea: 2.70 }],
    synchronisationBonus: { excitement: 0.45, intensity: 0.15 },
    statRequirements: {
      highestDropHeight: { value: 6 },
      maxSpeed: { value: 0x80000 },
      maxLateralGs: { value: 1.30 },
      firstLength: { value: 0xC80000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  miniatureRailway: {
    id: 'miniatureRailway',
    name: 'Miniature Railway',
    excitement: 70,
    intensity: 6,
    nausea: -10,
    unreliability: 11,
    baseRatings: [{ excitement: 2.50, intensity: 0.00, nausea: 0.00 }],
    statRequirements: {
      firstLength: { value: 0xC80000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 },
    specialStatRequirements: {
      shelteredEighths: { value: 4, excitement: 4, intensity: 1, nausea: 1 },
    }
  },
  monorail: {
    id: 'monorail',
    name: 'Monorail',
    excitement: 70,
    intensity: 6,
    nausea: -10,
    unreliability: 14,
    baseRatings: [{ excitement: 2.00, intensity: 0.00, nausea: 0.00 }],
    statRequirements: {
      firstLength: { value: 0xAA0000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 },
    specialStatRequirements: {
      shelteredEighths: { value: 4, excitement: 4, intensity: 1, nausea: 1 },
    }
  },
  monorailCycles: {
    id: 'monorailCycles',
    name: 'Monorail Cycles',
    excitement: 50,
    intensity: 10,
    nausea: 10,
    unreliability: 4,
    baseRatings: [{ excitement: 1.40, intensity: 0.20, nausea: 0.00 }],
    synchronisationBonus: { excitement: 0.15, intensity: 0.00 },
    statRequirements: {
      firstLength: { value: 0x8C0000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  motionSimulator: {
    id: 'motionSimulator',
    name: 'Motion Simulator',
    excitement: 24,
    intensity: 20,
    nausea: 10,
    unreliability: 21,
    baseRatings: [
      { mode: 'Film: Avenging aviators', excitement: 2.90, intensity: 3.50, nausea: 3.00 },
      { mode: 'Film: Thrill riders', excitement: 2.90, intensity: 3.50, nausea: 3.00 },
    ],
    shelteredEighths: 7
  },
  multiDimensionRollerCoaster: {
    id: 'multiDimensionRollerCoaster',
    name: 'Multi-Dimension Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 18,
    baseRatings: [{ excitement: 3.75, intensity: 1.95, nausea: 4.79 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.40, ignoredByInversions: true },
      numberOfDrops: { value: 2, ignoredByInversions: true },
    },
    standardPenalty: { excitement: 2, intensity: 1, nausea: 1 },
    specialStatRequirements: {
      numberOfInversions: { value: 1, excitement: 4, intensity: 1, nausea: 1 },
    }
  },
  observationTower: {
    id: 'observationTower',
    name: 'Observation Tower',
    excitement: 80,
    intensity: 10,
    nausea: 0,
    unreliability: 15,
    baseRatings: [{ excitement: 1.50, intensity: 0.00, nausea: 0.10 }],
    shelteredEighths: 7 // todo statRequirements.shelteredEighths value of 5? doesn't make much sense since ride has 7 shelteredEighths...
  },
  reverseFreefallCoaster: {
    id: 'reverseFreefallCoaster',
    name: 'Reverse Freefall Coaster',
    excitement: 44,
    intensity: 66,
    nausea: 10,
    unreliability: 25,
    baseRatings: [{ excitement: 2.00, intensity: 3.20, nausea: 2.80 }],
    synchronisationBonus: { excitement: 0.60, intensity: 0.15 },
    statRequirements: {
      highestDropHeight: { value: 34 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  reverserRollerCoaster: {
    id: 'reverserRollerCoaster',
    name: 'Reverser Roller Coaster',
    excitement: 48,
    intensity: 28,
    nausea: 7,
    unreliability: 19,
    baseRatings: [{ excitement: 2.40, intensity: 1.80, nausea: 1.70 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      firstLength: { value: 0xC80000 },
      numberOfDrops: { value: 2 },
    },
    standardPenalty: { excitement: 2, intensity: 1, nausea: 1 },
    specialStatRequirements: {
      numberOfReversers: { value: 1, excitement: 8, intensity: 1, nausea: 1 },
    }
  },
  riverRafts: {
    id: 'riverRafts',
    name: 'River Rafts',
    excitement: 80,
    intensity: 34,
    nausea: 6,
    unreliability: 12,
    baseRatings: [{ excitement: 1.45, intensity: 0.25, nausea: 0.34 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 }
  },
  riverRapids: {
    id: 'riverRapids',
    name: 'River Rapids',
    excitement: 72,
    intensity: 26,
    nausea: 6,
    unreliability: 16,
    baseRatings: [{ excitement: 1.20, intensity: 0.70, nausea: 0.50 }],
    synchronisationBonus: { excitement: 0.30, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 2 },
      firstLength: { value: 0xC80000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  rotoDrop: {
    id: 'rotoDrop',
    name: 'Roto-Drop',
    excitement: 50,
    intensity: 50,
    nausea: 10,
    unreliability: 24,
    baseRatings: [{ excitement: 2.80, intensity: 3.50, nausea: 3.50 }]
  },
  sideFrictionRollerCoaster: {
    id: 'sideFrictionRollerCoaster',
    name: 'Side-Friction Roller Coaster',
    excitement: 48,
    intensity: 28,
    nausea: 7,
    unreliability: 19,
    baseRatings: [{ excitement: 2.50, intensity: 2.00, nausea: 1.50 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 6 },
      maxSpeed: { value: 0x50000 },
      firstLength: { value: 0xFA0000 },
      numberOfDrops: { value: 2 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  spaceRings: {
    id: 'spaceRings',
    name: 'Space Rings',
    excitement: 12,
    intensity: 4,
    nausea: 4,
    unreliability: 7,
    baseRatings: [{ excitement: 1.50, intensity: 2.10, nausea: 6.50 }],
    shelteredEighths: 0
  },
  spiralRollerCoaster: {
    id: 'spiralRollerCoaster',
    name: 'Spiral Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 14,
    baseRatings: [{ excitement: 3.30, intensity: 0.30, nausea: 0.30 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 12, ignoredByInversions: true },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.40, ignoredByInversions: true },
      numberOfDrops: { value: 2, ignoredByInversions: true },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  spiralSlide: {
    id: 'spiralSlide',
    name: 'Spiral Slide',
    excitement: 50,
    intensity: 10,
    nausea: 0,
    unreliability: 8,
    baseRatings: [{ excitement: 1.50, intensity: 1.40, nausea: 0.90 }], // todo unlimited rides boost
    shelteredEighths: 2
  },
  splashBoats: {
    id: 'splashBoats',
    name: 'Splash Boats',
    excitement: 80,
    intensity: 34,
    nausea: 6,
    unreliability: 15,
    baseRatings: [{ excitement: 1.46, intensity: 0.35, nausea: 0.30 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 6 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  standUpRollerCoaster: {
    id: 'standUpRollerCoaster',
    name: 'Stand-up Roller Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 17,
    baseRatings: [{ excitement: 2.50, intensity: 3.00, nausea: 3.00 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.10 },
    statRequirements: {
      highestDropHeight: { value: 12 },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.50 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  steelWildMouse: {
    id: 'steelWildMouse',
    name: 'Steel Wild Mouse',
    excitement: 50,
    intensity: 30,
    nausea: 30,
    unreliability: 14,
    baseRatings: [{ excitement: 2.80, intensity: 2.50, nausea: 2.10 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.8 },
    statRequirements: {
      highestDropHeight: { value: 6 },
      maxSpeed: { value: 0x70000 },
      maxLateralGs: { value: 1.50 },
      firstLength: { value: 0xAA0000 },
      numberOfDrops: { value: 2 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  steeplechase: {
    id: 'steeplechase',
    name: 'Steeplechase',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 14,
    baseRatings: [{ excitement: 2.70, intensity: 2.40, nausea: 1.80 }],
    synchronisationBonus: { excitement: 0.75, intensity: 0.9 },
    statRequirements: {
      highestDropHeight: { value: 4 },
      maxSpeed: { value: 0x80000 },
      maxNegativeGs: { value: 0.50 },
      firstLength: { value: 0xF00000 },
      numberOfDrops: { value: 2 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  submarineRide: {
    id: 'submarineRide',
    name: 'Submarine Ride',
    excitement: 70,
    intensity: 6,
    nausea: 0,
    unreliability: 7,
    baseRatings: [{ excitement: 2.20, intensity: 1.80, nausea: 1.40 }]
  },
  suspendedMonorail: {
    id: 'suspendedMonorail',
    name: 'Suspended Monorail',
    excitement: 70,
    intensity: 6,
    nausea: -10,
    unreliability: 14,
    baseRatings: [{ excitement: 2.15, intensity: 0.23, nausea: 0.8 }],
    statRequirements: {
      firstLength: { value: 0xAA0000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 },
    specialStatRequirements: {
      shelteredEighths: { value: 4, excitement: 4, intensity: 1, nausea: 1 },
    }
  },
  suspendedSwingingCoaster: {
    id: 'suspendedSwingingCoaster',
    name: 'Suspended Swinging Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 18,
    baseRatings: [{ excitement: 3.30, intensity: 2.90, nausea: 3.50 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.10 },
    statRequirements: {
      highestDropHeight: { value: 8 },
      maxSpeed: { value: 0xC0000 },
      maxNegativeGs: { value: 0.60 },
      maxLateralGs: { value: 1.50 },
      firstLength: { value: 0x1720000 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  swingingInverterShip: {
    id: 'swingingInverterShip',
    name: 'Swinging Inverter Ship',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 16,
    baseRatings: [{ excitement: 2.50, intensity: 2.70, nausea: 2.74 }],
    shelteredEighths: 0
  },
  swingingShip: {
    id: 'swingingShip',
    name: 'Swinging Ship',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 10,
    baseRatings: [{ excitement: 1.50, intensity: 1.90, nausea: 1.41 }],
    shelteredEighths: 0
  },
  topSpin: {
    id: 'topSpin',
    name: 'Top Spin',
    excitement: 24,
    intensity: 20,
    nausea: 10,
    unreliability: 19,
    baseRatings: [
      { mode: 'Beginners mode', excitement: 2.00, intensity: 4.80, nausea: 5.74 },
      { mode: 'Intense mode', excitement: 3.00, intensity: 5.75, nausea: 6.64 },
      { mode: 'Berserk mode', excitement: 3.20, intensity: 6.80, nausea: 7.94 }
    ],
    shelteredEighths: 0
  },
  twist: {
    id: 'twist',
    name: 'Twist',
    excitement: 40,
    intensity: 20,
    nausea: 10,
    unreliability: 16,
    baseRatings: [{ excitement: 1.13, intensity: 0.97, nausea: 1.90 }], // todo plus rotations
    shelteredEighths: 0
  },
  twisterRollerCoaster: {
    id: 'twisterRollerCoaster',
    name: 'Twister Roller Coaster',
    excitement: 52,
    intensity: 36,
    nausea: 10,
    unreliability: 15,
    baseRatings: [{ excitement: 3.50, intensity: 0.40, nausea: 0.30 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 12, ignoredByInversions: true },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.40, ignoredByInversions: true },
      numberOfDrops: { value: 2, ignoredByInversions: true },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  verticalDropRollerCoaster: {
    id: 'verticalDropRollerCoaster',
    name: 'Vertical Drop Roller Coaster',
    excitement: 52,
    intensity: 38,
    nausea: 10,
    unreliability: 16,
    baseRatings: [{ excitement: 3.20, intensity: 0.80, nausea: 0.30 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 20 },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.10 },
      numberOfDrops: { value: 1 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  virginiaReel: {
    id: 'virginiaReel',
    name: 'Virginia Reel',
    excitement: 30,
    intensity: 15,
    nausea: 25,
    unreliability: 19,
    baseRatings: [{ excitement: 2.10, intensity: 1.90, nausea: 3.70 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      firstLength: { value: 0xD20000 },
      numberOfDrops: { value: 2 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  waterCoaster: {
    id: 'waterCoaster',
    name: 'Water Coaster',
    excitement: 50,
    intensity: 30,
    nausea: 10,
    unreliability: 14,
    baseRatings: [{ excitement: 2.70, intensity: 2.80, nausea: 2.10 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 8 },
      maxSpeed: { value: 0x70000 },
      numberOfDrops: { value: 1 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 },
    specialStatRequirements: {
      numberOfWaterElements: { value: 1, excitement: 8, intensity: 1, nausea: 1 },
    }
  },
  woodenRollerCoaster: {
    id: 'woodenRollerCoaster',
    name: 'Wooden Roller Coaster',
    excitement: 52,
    intensity: 33,
    nausea: 8,
    unreliability: 19,
    baseRatings: [{ excitement: 3.20, intensity: 2.60, nausea: 2.00 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.05 },
    statRequirements: {
      highestDropHeight: { value: 12 },
      maxSpeed: { value: 0xA0000 },
      maxNegativeGs: { value: 0.10 },
      firstLength: { value: 0x1720000 },
      numberOfDrops: { value: 2 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  },
  woodenWildMouse: {
    id: 'woodenWildMouse',
    name: 'Wooden Wild Mouse',
    excitement: 50,
    intensity: 30,
    nausea: 30,
    unreliability: 14,
    baseRatings: [{ excitement: 2.90, intensity: 2.90, nausea: 2.10 }],
    synchronisationBonus: { excitement: 0.40, intensity: 0.8 },
    statRequirements: {
      highestDropHeight: { value: 8 },
      maxSpeed: { value: 0x70000 },
      maxNegativeGs: { value: 0.10 },
      maxLateralGs: { value: 1.50 },
      firstLength: { value: 0xAA0000 },
      numberOfDrops: { value: 3 },
    },
    standardPenalty: { excitement: 2, intensity: 2, nausea: 2 }
  }
};