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
  const ridePenaltyConverterServiceSpy = jasmine.createSpyObj('RidePenaltyConverterService', ['highestDropHeight', 'maxSpeed', 'firstLength']);
  const rideTypeRepositoryServiceSpy = jasmine.createSpyObj('RideTypeRepositoryService', ['get', 'getAll']);

  rideAgeRepositoryServiceSpy.getAll.and.returnValue([]);

  ridePenaltyConverterServiceSpy.highestDropHeight.and.returnValue(25);
  ridePenaltyConverterServiceSpy.maxSpeed.and.returnValue(27);
  ridePenaltyConverterServiceSpy.firstLength.and.returnValue(170);

  rideTypeRepositoryServiceSpy.get.and.returnValue({});

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
        },
        maxSpeed: {
          value: 0xC0000,
          excitement: 1,
          intensity: 2,
          nausea: 1
        },
        maxNegativeGs: {
          value: 0.1,
          excitement: 1,
          intensity: 1,
          nausea: 2
        },
        maxLateralGs: {
          value: 1.5,
          excitement: 2,
          intensity: 2,
          nausea: 1
        },
        firstLength: {
          value: 0xAA0000,
          excitement: 2,
          intensity: 2,
          nausea: 2
        },
        numberOfDrops: {
          value: 3,
          excitement: 1,
          intensity: 2,
          nausea: 2
        },
      }
    };
    rideGroupRepositoryServiceSpy.get.and.returnValue(rideGroup);

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

  it('#hasAnyStatRequirements should return true if any stat requirement property exists', () => {
    // Assert
    const result = component.hasAnyStatRequirements();
    expect(result).toBeTrue();

    // todo false
  });

  it('#hasStatRequirement should return true if the stat requirement property exists', () => {
    // Assert
    const result = component.hasStatRequirement('highestDropHeight');
    expect(result).toBeTrue();

    // todo false
  });

  it('#getStatRequirement should show the correct stat requirement in metres for highest drop height', () => {
    // Assert
    const requiredValue = component.getStatRequirement('highestDropHeight');
    expect(requiredValue).toBe('25m');
  });

  it('#getStatRequirement should show the correct stat requirement in km/h for max speed', () => {
    // Assert
    const requiredValue = component.getStatRequirement('maxSpeed');
    expect(requiredValue).toBe('27km/h');
  });

  it('#getStatRequirement should show the correct stat requirement in G\'s for max negative G\'s', () => {
    // Assert
    const requiredValue = component.getStatRequirement('maxNegativeGs');
    expect(requiredValue).toBe('0.10g');
  });

  it('#getStatRequirement should show the correct stat requirement in G\'s for max lateral G\'s', () => {
    // Assert
    const requiredValue = component.getStatRequirement('maxLateralGs');
    expect(requiredValue).toBe('1.50g');
  });

  it('#getStatRequirement should show the correct stat requirement in m for first length', () => {
    // Assert
    const requiredValue = component.getStatRequirement('firstLength');
    expect(requiredValue).toBe('170m');
  });

  it('#getStatRequirement should show the correct stat requirement for number of drops', () => {
    // Assert
    const requiredValue = component.getStatRequirement('numberOfDrops');
    expect(requiredValue).toBe('3');
  });

  it('#getPenaltyMessage should show the correct error message if only excitement is divided by 2 for highest drop height', () => {
    // Assert
    const message = component.getPenaltyMessage('highestDropHeight');
    expect(message).toBe('Penalty: Excitement divided by 2');
  });

  it('#getPenaltyMessage should show the correct error message if all ratings are divided by 4 for highest drop height', () => {
    // Arrange
    rideGroup.statRequirements.highestDropHeight.excitement = 4;
    rideGroup.statRequirements.highestDropHeight.intensity = 4;
    rideGroup.statRequirements.highestDropHeight.nausea = 4;
    fixture.detectChanges();

    // Assert
    const message = component.getPenaltyMessage('highestDropHeight');
    expect(message).toBe('Penalty: All ratings divided by 4');
  });

  it('#getPenaltyMessage should show the correct error message if only intensity is divided by 2 for max speed', () => {
    // Assert
    const message = component.getPenaltyMessage('maxSpeed');
    expect(message).toBe('Penalty: Intensity divided by 2');
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
