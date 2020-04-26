import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RideComponent } from './ride.component';

import { AdmissionMode } from './../shared/models/park.model';
import { PersistenceService } from './../shared/services/persistence.service';
import { PriceConverterService } from './../shared/services/price-converter.service';
import { Ride } from '../shared/models/ride.model';
import { RideAge } from '../shared/enums/ride-age';
import { RideAgeRepositoryService } from './../shared/services/ride-age-repository.service';
import { RideDuplicateFlaggerService } from './../shared/services/ride-duplicate-flagger.service';
import { RideGroup } from './../shared/models/ride-group.model';
import { RidePriceCalculatorService } from './../shared/services/ride-price-calculator.service';
import { RideService } from './../shared/services/ride.service';
import { RideType } from './../shared/models/ride-type.model';
import { RideTypeRepositoryService } from '../shared/services/ride-type-repository.service';
import { StatRequirementConverterService } from '../shared/services/stat-requirement-converter.service';
import { GameVersion } from '../shared/enums/game-version';

describe('RideComponent', () => {
  let component: RideComponent;
  let fixture: ComponentFixture<RideComponent>;

  let rideType: RideType;
  let rideGroup: RideGroup;

  const dummyRide: Ride = {
    name: '',
    age: RideAge.LessThan5Months,
    typeId: '',
    excitement: 0,
    intensity: 0,
    nausea: 0,
    duplicates: []
  };

  const persistenceServiceSpy = jasmine.createSpyObj('PersistenceService', ['save', 'load']);
  const priceConverterServiceSpy = jasmine.createSpyObj('PriceConverterService', ['ridePrice']);

  const rideAgeRepositoryServiceSpy = jasmine.createSpyObj('RideAgeRepositoryService', ['getAll']);
  rideAgeRepositoryServiceSpy.getAll.and.returnValue([]);

  const rideDuplicateFlaggerServiceSpy = jasmine.createSpyObj('RideDuplicateFlaggerService', ['flag']);
  const ridePriceCalculatorServiceSpy = jasmine.createSpyObj('RidePriceCalculatorService', ['max', 'min']);
  const rideServiceSpy = jasmine.createSpyObj('RideService', ['getType', 'getGroup', 'getInitialName']);
  const rideTypeRepositoryServiceSpy = jasmine.createSpyObj('RideTypeRepositoryService', ['getAll']);

  const statRequirementConverterServiceSpy = jasmine.createSpyObj('StatRequirementConverterService', ['highestDropHeight', 'maxSpeed', 'firstLength', 'shelteredEighths']);
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
        { provide: PersistenceService, useValue: persistenceServiceSpy },
        { provide: PriceConverterService, useValue: priceConverterServiceSpy },
        { provide: RideAgeRepositoryService, useValue: rideAgeRepositoryServiceSpy },
        { provide: RideDuplicateFlaggerService, useValue: rideDuplicateFlaggerServiceSpy },
        { provide: RidePriceCalculatorService, useValue: ridePriceCalculatorServiceSpy },
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

    rideServiceSpy.getType.and.returnValue(rideType);
    rideServiceSpy.getGroup.and.returnValue(rideGroup);

    rideDuplicateFlaggerServiceSpy.flag.calls.reset();

    fixture = TestBed.createComponent(RideComponent);
    component = fixture.componentInstance;

    component.saveData = {
      appVersion: '1.3.0',
      options: {
        gameVersion: GameVersion.VanillaRct2
      },
      parks: [
        {
          name: '',
          admissionMode: AdmissionMode.FreeParkEntryPayPerRide,
          showGoodValuePrice: false,
          rides:  [
            {
              name: 'Mango Muncher',
              age: RideAge.LessThan13Months,
              typeId: 'juniorRollerCoaster',
              excitement: 4.33,
              intensity: 4.01,
              nausea: 3.75,
              duplicates: []
            },
            {
              name: 'Chocolate Chasers',
              age: RideAge.LessThan5Months,
              typeId: 'woodenWildMouse',
              excitement: 4.75,
              intensity: 4.62,
              nausea: 3.10,
              duplicates: []
            },
            {
              name: 'Crisp Critters',
              age: RideAge.LessThan200Months,
              typeId: 'loopingRollerCoaster',
              excitement: 5.81,
              intensity: 6.74,
              nausea: 5.66,
              duplicates: []
            }
          ]
        }
      ]
    };

    component.ride = component.saveData.parks[0].rides[0];
    component.index = 0;

    persistenceServiceSpy.load.and.returnValue(component.saveData);
    persistenceServiceSpy.save.calls.reset();

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

  it('#getMaxPriceString should return the correct value', () => {
    // Arrange
    priceConverterServiceSpy.ridePrice.and.returnValue('£10.00');

    // Act
    const val = component.getMaxPriceString(dummyRide);

    // Assert
    expect(val).toBe('£10.00');
  });

  it('#getMinPriceString should return the correct value', () => {
    // Arrange
    priceConverterServiceSpy.ridePrice.and.returnValue('£10.00');

    // Act
    const val = component.getMinPriceString(dummyRide);

    // Assert
    expect(val).toBe('£10.00');
  });

  it('#onChangeRideName should call rideDuplicateFlaggerService and trigger auto-save', () => {
    // Act
    component.onChangeRideName();

    // Assert
    expect(rideDuplicateFlaggerServiceSpy.flag).toHaveBeenCalled();
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
  });

  it('#onMoveRideUp should move the chosen ride up one, the previous ride down one and trigger auto-save', () => {
    // Act
    component.onMoveRideUp(1);

    // Assert
    expect(component.rides[0].name).toBe('Chocolate Chasers');
    expect(component.rides[1].name).toBe('Mango Muncher');
    expect(component.rides[2].name).toBe('Crisp Critters');
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
  });

  it('#onMoveRideUp should do nothing if chosen ride is already at the top', () => {
    // Act
    component.onMoveRideUp(0);

    // Assert
    expect(component.rides[0].name).toBe('Mango Muncher');
    expect(component.rides[1].name).toBe('Chocolate Chasers');
    expect(component.rides[2].name).toBe('Crisp Critters');
    expect(persistenceServiceSpy.save).not.toHaveBeenCalled();
  });

  it('#onMoveRideDown should move the chosen ride down one, the next ride up one and trigger auto-save', () => {
    // Act
    component.onMoveRideDown(1);

    // Assert
    expect(component.rides[0].name).toBe('Mango Muncher');
    expect(component.rides[1].name).toBe('Crisp Critters');
    expect(component.rides[2].name).toBe('Chocolate Chasers');
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
  });

  it('#onMoveRideDown should do nothing if chosen ride is already at the bottom', () => {
    // Act
    component.onMoveRideDown(2);

    // Assert
    expect(component.rides[0].name).toBe('Mango Muncher');
    expect(component.rides[1].name).toBe('Chocolate Chasers');
    expect(component.rides[2].name).toBe('Crisp Critters');
    expect(persistenceServiceSpy.save).not.toHaveBeenCalled();
  });

  it('#canRefurbishRide should return true if it is more than 5 months old and false otherwise', () => {
    // Arrange
    const youngRide: Ride = {
      name: '',
      typeId: 'rideTypeId',
      age: RideAge.LessThan5Months,
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };

    const oldRide: Ride = {
      name: '',
      typeId: 'rideTypeId',
      age: RideAge.LessThan40Months,
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };

    // Act
    const youngResult = component.canRefurbishRide(youngRide);
    const oldResult = component.canRefurbishRide(oldRide);

    // Assert
    expect(youngResult).toBe(false);
    expect(oldResult).toBe(true);
  });

  it('#onClickRefurbishRide should reset the ride\'s age to less than 5 months old and trigger auto-save', () => {
    // Arrange
    const ride: Ride = {
      name: '',
      typeId: 'rideTypeId',
      age: RideAge.LessThan88Months,
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };

    // Act
    component.onClickRefurbishRide(ride);

    // Assert
    expect(ride.age).toBe(RideAge.LessThan5Months);
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
  });

  it('#onClickRefurbishRide should do nothing if the ride is already in the youngest age bracket', () => {
    // Arrange
    const ride: Ride = {
      name: '',
      typeId: 'rideTypeId',
      age: RideAge.LessThan5Months,
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };

    // Act
    component.onClickRefurbishRide(ride);

    // Assert
    expect(ride.age).toBe(RideAge.LessThan5Months);
    expect(persistenceServiceSpy.save).not.toHaveBeenCalled();
  });

  it('#canDegradeRideAge should return true if it is less than 200 months old and false otherwise', () => {
    // Arrange
    const youngRide: Ride = {
      name: '',
      typeId: 'rideTypeId',
      age: RideAge.LessThan40Months,
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };

    const oldRide: Ride = {
      name: '',
      typeId: 'rideTypeId',
      age: RideAge.MoreThan200Months,
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };

    // Act
    const youngResult = component.canDegradeRideAge(youngRide);
    const oldResult = component.canDegradeRideAge(oldRide);

    // Assert
    expect(youngResult).toBe(true);
    expect(oldResult).toBe(false);
  });

  it('#onClickDegradeRideAge should decrease the ride\'s age by one bracket and trigger auto-save', () => {
    // Arrange
    const ride: Ride = {
      name: '',
      typeId: 'rideTypeId',
      age: RideAge.LessThan40Months,
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };

    // Act
    component.onClickDegradeRideAge(ride);

    // Assert
    expect(ride.age).toBe(RideAge.LessThan64Months);
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
  });

  it('#onClickDegradeRideAge should do nothing if the ride is already in the oldest age bracket', () => {
    // Arrange
    const ride: Ride = {
      name: '',
      typeId: 'rideTypeId',
      age: RideAge.MoreThan200Months,
      excitement: 0,
      intensity: 0,
      nausea: 0,
      duplicates: []
    };

    // Act
    component.onClickDegradeRideAge(ride);

    // Assert
    expect(ride.age).toBe(RideAge.MoreThan200Months);
    expect(persistenceServiceSpy.save).not.toHaveBeenCalled();
  });

  it('#onClickExpandCollapseRide should trigger the parent to handle ride expansion toggling', () => {
    // Arrange
    component.isExpanded = false;
    spyOn(component.rideExpandToggled, 'emit');

    // Act
    component.onClickExpandCollapseRide();

    // TODO DOM check

    // Assert
    expect(component.rideExpandToggled.emit).toHaveBeenCalledWith(0);
  });

  it('#onChangeRideType should change the name if it was the ride type default', () => {
    // Arrange
    component.rides = [
      {
        name: 'Type A 1',
        age: RideAge.LessThan5Months,
        typeId: 'typeAId',
        excitement: 0,
        intensity: 0,
        nausea: 0,
        duplicates: []
      },
      {
        name: 'Type B 1',
        age: RideAge.LessThan5Months,
        typeId: 'typeBId',
        excitement: 0,
        intensity: 0,
        nausea: 0,
        duplicates: []
      }
    ];

    component.ride = component.rides[1];
    fixture.detectChanges();

    rideServiceSpy.getType.withArgs(component.ride).and.returnValue({
      id: 'typeBId',
      name: 'Type B',
      groupId: 'testGroup'
    });

    rideServiceSpy.getInitialName.withArgs(component.ride, component.rides).and.returnValue('Type A 2');

    // Act
    component.onChangeRideType('typeAId');
    fixture.detectChanges();

    // Assert
    expect(component.ride.name).toBe('Type A 2');
  });

  it('#onClickShowRideData should display a ride data modal', () => {
    // Arrange
    component.isExpanded = true;

    // Act
    component.onClickShowRideData();
    fixture.detectChanges();

    // Assert
    const rideDataModal = fixture.debugElement.query(By.css('div[data-test-id="ride-data-modal"]')).nativeElement;
    expect(rideDataModal.getAttribute('class')).toContain('is-active');
  });

  it('#onClickShowRideData should display a ride data modal with a \'minimum stat requirements\' section if ride has any minimum stat requirements', () => {
    // Arrange
    component.isExpanded = true;

    // Act
    component.onClickShowRideData();
    fixture.detectChanges();

    // Assert
    const minimumStatRequirements = fixture.debugElement.query(By.css('div[data-test-id="minimum-stat-requirements"]')).nativeElement;
    expect(minimumStatRequirements).toBeTruthy();
  });

  it('#onClickShowRideData should display a ride data modal without a \'minimum stat requirements\' section if ride has no minimum stat requirements', () => {
    // Arrange
    component.isExpanded = true;
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
    component.isExpanded = true;
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
    // Arrange
    component.isExpanded = true;

    // Act
    component.onClickAttemptDelete();
    fixture.detectChanges();

    // Assert
    const deleteModal = fixture.debugElement.query(By.css('div[data-test-id="delete-ride-modal"]')).nativeElement;
    expect(deleteModal.getAttribute('class')).toContain('is-active');
  });
});
