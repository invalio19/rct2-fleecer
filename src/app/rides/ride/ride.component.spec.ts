import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RideComponent } from './ride.component';

import { RideAge } from '../shared/enums/ride-age';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';
import { RideGroup } from './../shared/models/ride-group.model';
import { RideService } from './../shared/services/ride.service';
import { RideType } from './../shared/models/ride-type.model';
import { RideTypeRepositoryService } from '../shared/services/ride-type-repository.service';
import { StatRequirementConverterService } from '../shared/services/stat-requirement-converter.service';

describe('RideComponent', () => {
  let component: RideComponent;
  let fixture: ComponentFixture<RideComponent>;

  let rideType: RideType;
  let rideGroup: RideGroup;

  const rideServiceSpy = jasmine.createSpyObj('RideService', ['getGroup']);
  const rideAgeRepositoryServiceSpy = jasmine.createSpyObj('RideAgeRepositoryService', ['getAll']);
  const rideTypeRepositoryServiceSpy = jasmine.createSpyObj('RideTypeRepositoryService', ['get', 'getAll']);
  const statRequirementConverterServiceSpy = jasmine.createSpyObj('StatRequirementConverterService', ['highestDropHeight', 'maxSpeed', 'firstLength', 'shelteredEighths']);

  rideAgeRepositoryServiceSpy.getAll.and.returnValue([]);

  statRequirementConverterServiceSpy.highestDropHeight.and.returnValue(25);
  statRequirementConverterServiceSpy.maxSpeed.and.returnValue(27);
  statRequirementConverterServiceSpy.firstLength.and.returnValue(170);
  statRequirementConverterServiceSpy.shelteredEighths.and.returnValue(62.5);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RideComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RideAgeRepositoryService, useValue: rideAgeRepositoryServiceSpy },
        { provide: RideService, useValue: rideServiceSpy },
        { provide: RideTypeRepositoryService, useValue: rideTypeRepositoryServiceSpy },
        { provide: StatRequirementConverterService, useValue: statRequirementConverterServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    rideType = {
      id: 'testType',
      name: 'Test Type',
      groupId: 'testGroup'
    };
    rideTypeRepositoryServiceSpy.get.and.returnValue(rideType);

    rideGroup = {
      id: 'testGroup',
      name: 'Test Group',
      excitement: 0,
      intensity: 0,
      nausea: 0,
      unreliability: 14,
      baseRatings: [{ excitement: 2.90, intensity: 2.90, nausea: 2.10 }],
      synchronisationBonus: { excitement: 0.40, intensity: 0.8 },
      statRequirements: [
        {
          highestDropHeight: { value: 8 },
          maxSpeed: { value: 0x70000 },
          maxNegativeGs: { value: 0.10 },
          maxLateralGs: { value: 1.50 },
          firstLength: { value: 0xAA0000 },
          numberOfDrops: { value: 3 },
          shelteredEighths: { value: 5 },
          penalty: { excitement: 2, intensity: 1, nausea: 1 }
        }
      ]
    };
    rideServiceSpy.getGroup.and.returnValue(rideGroup);

    fixture = TestBed.createComponent(RideComponent);
    component = fixture.componentInstance;

    component.ride = {
      name: '',
      age: RideAge.LessThan5Months,
      typeId: 'dummy',
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };
    component.index = 0;

    fixture.detectChanges();
  });

  afterAll(() => {
    component.isRideDataModalActive = false;
    component.isDeleteModalActive = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show ride data button if ride has no minimum stat requirements', () => {
    // Arrange
    rideGroup.statRequirements = undefined;
    fixture.detectChanges();

    // Assert
    const rideDataButton = fixture.debugElement.query(By.css('button[data-test-id="ride-data-button"]'));
    expect(rideDataButton).toBeFalsy();
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

  it('#getRideTypeName should return the ride type\'s name', () => {
    // Act
    const rideTypeName = component.getRideTypeName();

    // Assert
    expect(rideTypeName).toBe('Test Type');
  });

  it ('#getRideGroupStatRequirements should return the stat requirements of the ride group', () => {
    // Act
    const rideGroupStatRequirements = component.getRideGroupStatRequirements();

    // Assert
    expect(rideGroupStatRequirements).toEqual([
      {
        highestDropHeight: { value: 8 },
        maxSpeed: { value: 0x70000 },
        maxNegativeGs: { value: 0.10 },
        maxLateralGs: { value: 1.50 },
        firstLength: { value: 0xAA0000 },
        numberOfDrops: { value: 3 },
        shelteredEighths: { value: 5 },
        penalty: { excitement: 2, intensity: 1, nausea: 1 }
      }
    ]);
  });

  it('#hasAnyStatRequirements should return true if any stat requirement property exists', () => {
    // Act
    const result = component.hasAnyStatRequirements();

    // Assert
    expect(result).toBeTrue();
  });

  it('#hasAnyStatRequirements should return falsy if no stat requirement property exists', () => {
    // Arrange
    rideGroup.statRequirements = undefined;

    // Act
    const result = component.hasAnyStatRequirements();

    // Assert
    expect(result).toBeFalsy();
  });

  it('#getHighestDropHeightString should show the correct stat requirement in metres for highest drop height', () => {
    // Act
    const requiredValue = component.getHighestDropHeightString(rideGroup.statRequirements[0]);

    // Assert
    expect(requiredValue).toBe('25m');
  });

  it('#getMaxSpeedString should show the correct stat requirement in km/h for max speed', () => {
    // Act
    const requiredValue = component.getMaxSpeedString(rideGroup.statRequirements[0]);

    // Assert
    expect(requiredValue).toBe('27km/h');
  });

  it('#getMaxNegativeGsString should show the correct stat requirement in G\'s for max negative G\'s', () => {
    // Act
    const requiredValue = component.getMaxNegativeGsString(rideGroup.statRequirements[0]);

    // Assert
    expect(requiredValue).toBe('0.10g');
  });

  it('#getMaxLateralGsString should show the correct stat requirement in G\'s for max lateral G\'s', () => {
    // Act
    const requiredValue = component.getMaxLateralGsString(rideGroup.statRequirements[0]);

    // Assert
    expect(requiredValue).toBe('1.50g');
  });

  it('#getFirstLengthString should show the correct stat requirement in m for first length', () => {
    // Act
    const requiredValue = component.getFirstLengthString(rideGroup.statRequirements[0]);

    // Assert
    expect(requiredValue).toBe('170m');
  });

  it('#getShelteredEighthsString should show the correct stat requirement for sheltered eighths', () => {
    // Act
    const requiredValue = component.getShelteredEighthsString(rideGroup.statRequirements[0]);

    // Assert
    expect(requiredValue).toBe('<62.5%');
  });

  it('#showInversionRequirementMessage should display if any stat requirement is not needed if the ride has any inversions', () => {
    // Arrange
    rideGroup.statRequirements[0].highestDropHeight = { value: 8, ignoredByInversions: true };

    // Act
    const required = component.showInversionRequirementMessage(rideGroup.statRequirements[0]);

    // Assert
    expect(required).toBeTrue();
  });

  it('#showInversionRequirementMessage should not display if all stat requirements aren\'t ignored by inversions', () => {
    // Act
    const required = component.showInversionRequirementMessage(rideGroup.statRequirements[0]);

    // Assert
    expect(required).toBeFalsy();
  });

  it('#getPenaltyMessage should show the correct error message if only excitement is divided by 2', () => {
    // Act
    const message = component.getPenaltyMessage(rideGroup.statRequirements[0].penalty);

    // Assert
    expect(message).toBe('Excitement is divided by 2 for each unmet requirement');
  });

  it('#getPenaltyMessage should show the correct error message if all ratings are divided by 4', () => {
    // Arrange
    rideGroup.statRequirements[0].penalty = { excitement: 4, intensity: 4, nausea: 4 };
    fixture.detectChanges();

    // Assert
    const message = component.getPenaltyMessage(rideGroup.statRequirements[0].penalty);
    expect(message).toBe('All ratings are divided by 4 for each unmet requirement');
  });

  it('#onClickAttemptDelete should show \'delete ride\' modal', () => {
    // Act
    component.onClickAttemptDelete();
    fixture.detectChanges();

    // Assert
    const deleteModal = fixture.debugElement.query(By.css('div[data-test-id="delete-ride-modal"]')).nativeElement;
    expect(deleteModal.getAttribute('class')).toContain('is-active');
  });
});
