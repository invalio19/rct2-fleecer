import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RideComponent } from './ride.component';

import { RideAge } from '../shared/enums/ride-age';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';
import { RideGroup } from './../shared/models/ride-group.model';
import { RideGroupRepositoryService } from '../shared/services/ride-group-repository.service';
import { RidePenaltyConverterService } from '../shared/services/ride-penalty-converter.service';
import { RideTypeRepositoryService } from '../shared/services/ride-type-repository.service';

describe('RideComponent', () => {
  let component: RideComponent;
  let fixture: ComponentFixture<RideComponent>;

  let rideGroup: RideGroup;

  const rideAgeRepositoryServiceSpy = jasmine.createSpyObj('RideAgeRepositoryService', ['getAll']);
  const rideGroupRepositoryServiceSpy = jasmine.createSpyObj('RideGroupRepositoryService', ['get']);
  const ridePenaltyConverterServiceSpy = jasmine.createSpyObj('RidePenaltyConverterService', ['highestDropHeight']);
  const rideTypeRepositoryServiceSpy = jasmine.createSpyObj('RideTypeRepositoryService', ['get', 'getAll']);

  rideAgeRepositoryServiceSpy.getAll.and.returnValue([[1,2,3,4]]);
  rideGroupRepositoryServiceSpy.get.and.returnValue({
    id: '3dCinema',
    name: '3D Cinema',
    excitement: 20,
    intensity: 10,
    nausea: 0
  });
  ridePenaltyConverterServiceSpy.highestDropHeight.withArgs(34).and.returnValue(25);
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
        { provide: RidePenaltyConverterService, useValue: ridePenaltyConverterServiceSpy },
        { provide: RideTypeRepositoryService, useValue: rideTypeRepositoryServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    rideGroup = {
      id: 'testGroup',
      name: 'Test Group',
      excitement: 0,
      intensity: 0,
      nausea: 0,
      statRequirements: {
        highestDropHeight: {
          value: 34,
          excitement: 2,
          intensity: 1,
          nausea: 1
        }
      }
    };
    rideGroupRepositoryServiceSpy.get.and.returnValue(rideGroup);

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

  it('#onClickShowRideData should display a ride data modal', () => {
    // Act
    component.onClickShowRideData();
    fixture.detectChanges();

    // Assert
    const rideDataModal = fixture.debugElement.query(By.css('div[data-test-id="ride-data-modal"]')).nativeElement;
    expect(rideDataModal.getAttribute('class')).toContain('is-active');
  });

  it('#onClickShowRideData should display a ride data modal with a \'minimum stat requirements\' section if ride has any minimum stat requirements', () => {
    // Act
    component.onClickShowRideData();
    fixture.detectChanges();

    // Assert
    const minimumStatRequirements = fixture.debugElement.query(By.css('div[data-test-id="minimum-stat-requirements"]')).nativeElement;
    expect(minimumStatRequirements).toBeTruthy();
  });

  it('#onClickShowRideData should display a ride data modal without a \'minimum stat requirements\' section if ride has no minimum stat requirements', () => {
    // Arrange
    rideGroup.statRequirements = undefined;

    // Act
    component.onClickShowRideData();
    fixture.detectChanges();

    // Assert
    const minimumStatRequirements = fixture.debugElement.query(By.css('div[data-test-id="minimum-stat-requirements"]'));
    expect(minimumStatRequirements).toBeFalsy();
  });

  it('#onClickShowRideData should display a ride data modal with the correct stat requirement shown', () => {
    // Act
    component.onClickShowRideData();
    fixture.detectChanges();

    // Assert
    expect(component.getHighestDropHeightString()).toBe('25m');
  });

  it('#onClickShowRideData should display a ride data modal with the correct rating penalty shown if the penalty divides by anything but 1', () => {
    // Act
    component.onClickShowRideData();
    fixture.detectChanges();

    // Assert
    const highestDropHeightPenaltyNotice = fixture.debugElement.query(By.css('ul[data-test-id="ride-rating-penalties"]:first-child li')).nativeElement;
    expect(highestDropHeightPenaltyNotice).toBe('Excitement is divided by 2');
  });

  it('#onClickShowRideData should display a ride data modal with no rating penalty shown if the penalty divides by 1', () => {
    // Act
    component.onClickShowRideData();
    fixture.detectChanges();

    // Assert
    const nonExistentPenaltyNotice = fixture.debugElement.query(By.css('ul[data-test-id="ride-rating-penalties"]:nth-child(2) li')).nativeElement;
    expect(nonExistentPenaltyNotice).toBeFalsy();
  });

  it('#onClickShowRideData should display a ride data modal with a single entry for penalties if all penalties divide by the same number', () => {
    // Arrange
    rideGroup.statRequirements.highestDropHeight.intensity = 2;
    rideGroup.statRequirements.highestDropHeight.nausea = 2;

    // Act
    component.onClickShowRideData();
    fixture.detectChanges();

    // Assert
    const highestDropHeightPenaltyNotice = fixture.debugElement.query(By.css('ul[data-test-id="ride-rating-penalties"]:first-child li')).nativeElement;
    expect(highestDropHeightPenaltyNotice).toBe('All ratings are divided by 2');
  });

  it('#onClickCloseRideDataModal should close the ride data modal', () => {
    // Arrange
    component.isRideDataModalActive = true;
    fixture.detectChanges();

    // Act
    component.onClickCloseRideDataModal();
    fixture.detectChanges();

    // Assert
    const rideDataModal = fixture.debugElement.query(By.css('div[data-test-id="ride-data-modal"]')).nativeElement;
    expect(rideDataModal.getAttribute('class')).not.toContain('is-active');
  });

  it('#onClickAttemptDelete should show \'delete ride\' modal', () => {
    // Act
    component.onClickAttemptDelete();
    fixture.detectChanges();

    // Assert
    const deleteModal = fixture.debugElement.query(By.css('div[data-test-id="delete-ride-modal"]')).nativeElement;
    expect(deleteModal.getAttribute('class')).toContain('is-active');
  })
});
