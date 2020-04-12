import { TestBed } from '@angular/core/testing';

import { RideDuplicateFlaggerService } from './ride-duplicate-flagger.service';

import { RideAge } from '../enums/ride-age';
import { RideType } from '../models/ride-type.model';
import { RideTypeRepositoryService } from './ride-type-repository.service';

describe('RideDuplicateFlaggerService', () => {
  let service: RideDuplicateFlaggerService;

  const rideTypeRepositoryServiceSpy = jasmine.createSpyObj('RideTypeRepositoryService', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RideDuplicateFlaggerService,
        { provide: RideTypeRepositoryService, useValue: rideTypeRepositoryServiceSpy }
      ]
    });
    service = TestBed.inject(RideDuplicateFlaggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#flag should update ride duplicates for rides with matching groups', () => {
    // Arrange
    const rides = [
      {
        name: 'Ride 1',
        typeId: 'rideType1',
        age: RideAge.LessThan5Months,
        excitement: 1.5,
        intensity: 2.5,
        nausea: 3.5,
        duplicates: []
      },
      {
        name: 'Ride 2',
        typeId: 'rideType2',
        age: RideAge.LessThan5Months,
        excitement: 1.5,
        intensity: 2.5,
        nausea: 3.5,
        duplicates: []
      },
      {
        name: 'Ride 3',
        typeId: 'rideType3',
        age: RideAge.LessThan5Months,
        excitement: 1.5,
        intensity: 2.5,
        nausea: 3.5,
        duplicates: []
      }
    ];

    const rideType1: RideType = {
      id: 'rideType1',
      name: 'Junior Roller Coaster',
      groupId: 'rideGroup1'
    };

    const rideType2: RideType = {
      id: 'rideType2',
      name: 'Classic Mini Roller Coaster',
      groupId: 'rideGroup1'
    };

    const rideType3: RideType = {
      id: 'rideType3',
      name: 'Classic Mini Roller Coaster',
      groupId: 'rideGroup2'
    };

    rideTypeRepositoryServiceSpy.get.withArgs('rideType1').and.returnValue(rideType1);
    rideTypeRepositoryServiceSpy.get.withArgs('rideType2').and.returnValue(rideType2);
    rideTypeRepositoryServiceSpy.get.withArgs('rideType3').and.returnValue(rideType3);

    // Act
    service.flag(rides);

    // Assert
    expect(rides[0].duplicates).toEqual(['Ride 2']);
    expect(rides[1].duplicates).toEqual(['Ride 1']);
    expect(rides[2].duplicates).toEqual([]);
  });
});
