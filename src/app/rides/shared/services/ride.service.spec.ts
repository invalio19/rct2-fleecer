import { TestBed } from '@angular/core/testing';

import { RideService } from './ride.service';

import { Ride } from '../models/ride.model';
import { RideAge } from './../enums/ride-age';
import { RideGroup } from '../models/ride-group.model';
import { RideGroupRepositoryService } from './ride-group-repository.service';
import { RideType } from './../models/ride-type.model';
import { RideTypeRepositoryService } from './ride-type-repository.service';

describe('RideService', () => {
  let service: RideService;

  let ride: Ride;

  const rideType: RideType = {
    id: 'testTypeId',
    name: 'Test Name',
    groupId: 'testGroupId'
  };

  const rideTypeRepositoryServiceSpy = jasmine.createSpyObj('RideTypeRepositoryService', ['get']);
  rideTypeRepositoryServiceSpy.get.withArgs('testTypeId').and.returnValue(rideType);
  rideTypeRepositoryServiceSpy.get.withArgs(undefined).and.returnValue(undefined);

  const rideGroup: RideGroup = {
    id: 'testGroupId',
    name: 'Test Group Type',
    excitement: 0,
    intensity: 0,
    nausea: 0,
    unreliability: 0,
    baseRatings: [{ excitement: 0, intensity: 0, nausea: 0 }]
  };

  const rideGroupRepositoryServiceSpy = jasmine.createSpyObj('RideGroupRepositoryService', ['get']);
  rideGroupRepositoryServiceSpy.get.withArgs('testGroupId').and.returnValue(rideGroup);
  rideGroupRepositoryServiceSpy.get.withArgs(undefined).and.returnValue(undefined);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RideService,
        { provide: RideGroupRepositoryService, useValue: rideGroupRepositoryServiceSpy },
        { provide: RideTypeRepositoryService, useValue: rideTypeRepositoryServiceSpy },
      ]
    });
    service = TestBed.inject(RideService);

    ride = {
      name: 'Test name',
      typeId: 'testTypeId',
      age: RideAge.LessThan5Months,
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getType should return the ride\'s type data', () => {
    // Act
    const result = service.getType(ride);

    // Assert
    expect(result).toBe(rideType);
  });

  it('#getGroup should return the ride\'s group data', () => {
    // Act
    const result = service.getGroup(ride);

    // Assert
    expect(result).toBe(rideGroup);
  });

  it('#getGroup should return nothing for rides without a type', () => {
    // Arrange
    ride.typeId = undefined;

    // Act
    const result = service.getGroup(ride);

    // Assert
    expect(result).toBeUndefined();
  });

  it('#getInitialName should return the ride type name followed by a \'1\' if no ride by that name already exists', () => {
    // Arrange
    ride = {
      name: '',
      typeId: 'testTypeId',
      age: RideAge.LessThan5Months,
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };

    const rides: Ride[] = [
      {
        name: 'A different name',
        typeId: 'testTypeId',
        age: RideAge.LessThan5Months,
        excitement: 0,
        intensity: 0,
        nausea: 0,
        duplicates: []
      }
    ];

    // Act
    const name = service.getInitialName(ride, rides);

    // Assert
    expect(name).toBe('Test Name 1');
  });

  it('#getInitialName should return the ride type name followed by the correct number if rides by that name already exist', () => {
    // Arrange
    ride = {
      name: '',
      typeId: 'testTypeId',
      age: RideAge.LessThan5Months,
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };

    const rides: Ride[] = [
      {
        name: 'Test Name 1',
        typeId: 'testTypeId',
        age: RideAge.LessThan5Months,
        excitement: 0,
        intensity: 0,
        nausea: 0,
        duplicates: []
      },
      {
        name: 'Test Name 4',
        typeId: 'testTypeId',
        age: RideAge.LessThan5Months,
        excitement: 0,
        intensity: 0,
        nausea: 0,
        duplicates: []
      },
      {
        name: 'Test Name 2',
        typeId: 'testTypeId',
        age: RideAge.LessThan5Months,
        excitement: 0,
        intensity: 0,
        nausea: 0,
        duplicates: []
      }
    ];

    // Act
    const name = service.getInitialName(ride, rides);

    // Assert
    expect(name).toBe('Test Name 3');
  });
});
