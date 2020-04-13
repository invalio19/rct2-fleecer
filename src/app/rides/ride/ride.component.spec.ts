import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideComponent } from './ride.component';

import { RideAge } from '../shared/enums/ride-age';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';
import { RideGroupRepositoryService } from '../shared/services/ride-group-repository.service';
import { RideTypeRepositoryService } from '../shared/services/ride-type-repository.service';

describe('RideComponent', () => {
  let component: RideComponent;
  let fixture: ComponentFixture<RideComponent>;

  const rideAgeRepositoryServiceSpy = jasmine.createSpyObj('RideAgeRepositoryService', ['getAll']);
  const rideGroupRepositoryServiceSpy = jasmine.createSpyObj('RideGroupRepositoryService', ['get']);
  const rideTypeRepositoryServiceSpy = jasmine.createSpyObj('RideTypeRepositoryService', ['get', 'getAll']);

  rideAgeRepositoryServiceSpy.getAll.and.returnValue([[1,2,3,4]]);

  rideGroupRepositoryServiceSpy.get.and.returnValue({
    id: '3dCinema',
    name: '3D Cinema',
    excitement: 20,
    intensity: 10,
    nausea: 0
  });

  rideTypeRepositoryServiceSpy.get.and.returnValue({
    id: '3dCinema',
    name: '3D Cinema',
    groupId: '3dCinema'
  });
  rideTypeRepositoryServiceSpy.getAll.and.returnValue([
    {
      id: '3dCinema',
      name: '3D Cinema',
      groupId: '3dCinema'
    }
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideComponent ],
      providers: [
        { provide: RideAgeRepositoryService, useValue: rideAgeRepositoryServiceSpy },
        { provide: RideGroupRepositoryService, useValue: rideGroupRepositoryServiceSpy },
        { provide: RideTypeRepositoryService, useValue: rideTypeRepositoryServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideComponent);
    component = fixture.componentInstance;

    component.ride = {
      name: 'Mango Muncher',
      age: RideAge.LessThan13Months,
      typeId: 'juniorRollerCoaster',
      excitement: 4.33,
      intensity: 4.01,
      nausea: 3.75,
      duplicates: []
    };
    component.index = 0;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
