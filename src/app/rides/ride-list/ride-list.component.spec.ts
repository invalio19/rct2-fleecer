import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RideListComponent } from './ride-list.component';

import { GameVersion } from './../shared/enums/game-version';
import { PersistenceService } from './../shared/services/persistence.service';
import { Ride } from './../shared/models/ride.model';
import { RideAge } from '../shared/enums/ride-age';
import { RideDuplicateFlaggerService } from './../shared/services/ride-duplicate-flagger.service';
import { RidePriceCalculatorService } from './../shared/services/ride-price-calculator.service';
import { SaveData } from './../shared/models/save-data.model';

describe('RideListComponent', () => {
  let component: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;

  const persistenceServiceSpy = jasmine.createSpyObj('PersistenceService', ['save', 'load']);
  const ridePriceCalculatorServiceSpy = jasmine.createSpyObj('RidePriceCalculatorService', ['max', 'min', 'recommendedParkEntranceFee']);
  const rideDuplicateFlaggerServiceSpy = jasmine.createSpyObj('RideDuplicateFlaggerService', ['flag']);

  const dummyRide: Ride = {
    name: '',
    age: RideAge.LessThan5Months,
    typeId: '',
    excitement: 0,
    intensity: 0,
    nausea: 0,
    duplicates: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RideListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: PersistenceService, useValue: persistenceServiceSpy },
        { provide: RideDuplicateFlaggerService, useValue: rideDuplicateFlaggerServiceSpy },
        { provide: RidePriceCalculatorService, useValue: ridePriceCalculatorServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const saveData: SaveData = {
      options: {
        gameVersion: GameVersion.VanillaRct2
      },
      parks: [
        {
          name: '',
          hasEntranceFee: false,
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
    persistenceServiceSpy.load.and.returnValue(saveData);
    persistenceServiceSpy.save.calls.reset();

    fixture = TestBed.createComponent(RideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    component.isRecommendedParkEntranceFeeModalActive = false;
    component.isDeleteAllRidesModalActive = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getMaxPriceString should show currency symbol and be to 2dp', () => {
    // Arrange
    ridePriceCalculatorServiceSpy.max.and.returnValue(10);

    // Act
    const val = component.getMaxPriceString(dummyRide);

    // Assert
    expect(val).toBe('£10.00');
  });

  it('#getMaxPriceString should show \'Free\' if ride has zero value', () => {
    // Arrange
    ridePriceCalculatorServiceSpy.max.and.returnValue(0);

    // Act
    const val = component.getMaxPriceString(dummyRide);

    // Assert
    expect(val).toBe('Free');
  });

  it('#getMinPriceString should show currency symbol and be to 2dp', () => {
    // Arrange
    ridePriceCalculatorServiceSpy.min.and.returnValue(10);

    // Act
    const val = component.getMinPriceString(dummyRide);

    // Assert
    expect(val).toBe('£10.00');
  });

  it('#getMaxPriceString should show \'Free\' if ride has zero value', () => {
    // Arrange
    ridePriceCalculatorServiceSpy.min.and.returnValue(0);

    // Act
    const val = component.getMinPriceString(dummyRide);

    // Assert
    expect(val).toBe('Free');
  });

  it('#getRecommendedParkEntranceFeeString should show currency symbol and be to 2dp', () => {
    // Arrange
    ridePriceCalculatorServiceSpy.recommendedParkEntranceFee.and.returnValue(35);

    // Act
    const val = component.getRecommendedParkEntranceFeeString();

    // Assert
    expect(val).toBe('£35.00');
  });

  it('#onClickGameVersion should set the appropriate game version and trigger auto-save', () => {
    // Act
    component.onClickGameVersion(GameVersion.OpenRct2);

    // Assert
    expect(component.saveData.options.gameVersion).toBe(GameVersion.OpenRct2);
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
  });

  it('#onChangeHasEntranceFee should set showGoodValuePrice to false if hasEntranceFee is changed to true and trigger auto-save', () => {
    // Arrange
    component.park.hasEntranceFee = true;
    component.park.showGoodValuePrice = true;

    // Act
    component.onChangeHasEntranceFee();

    // Assert
    expect(component.park.showGoodValuePrice).toBe(false);
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
  });

  it('#onClickRecommendedParkEntranceFeeWhy should show park entrance fee explanation modal', () => {
    // Arrange
    component.park.hasEntranceFee = true;
    fixture.detectChanges(); // show the park entrance fee section

    // Act
    component.onClickRecommendedParkEntranceFeeWhy();
    fixture.detectChanges();

    // Assert
    const onClickRecommendedParkEntranceFeeModal = fixture.debugElement.query(By.css('div[data-test-id="recommended-park-entrance-fee-modal"]')).nativeElement;
    expect(onClickRecommendedParkEntranceFeeModal.getAttribute('class')).toContain('is-active');
  });

  it('#onCloseRecommendedParkEntranceFeeModal should close park entrance fee explanation modal', () => {
    // Arrange
    component.park.hasEntranceFee = true;
    component.isRecommendedParkEntranceFeeModalActive = true;
    fixture.detectChanges();

    // Act
    component.onCloseRecommendedParkEntranceFeeModal();
    fixture.detectChanges();

    // Assert
    const onClickRecommendedParkEntranceFeeModal = fixture.debugElement.query(By.css('div[data-test-id="recommended-park-entrance-fee-modal"]')).nativeElement;
    expect(onClickRecommendedParkEntranceFeeModal.getAttribute('class')).not.toContain('is-active');
  });

  it('#onChangeShowGoodValuePrices should trigger auto-save', () => {
    // Act
    component.onChangeShowGoodValuePrices();

    // Assert
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
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

  it('#onExpandCollapseRide should set expandedIndex for ride component if ride isn\'t already expanded', () => {
    // Arrange
    component.expandedIndex = 1;

    // Act
    component.onExpandCollapseRide(2);

    // TODO DOM check

    // Assert
    expect(component.expandedIndex).toBe(2);
  });

  it('#onExpandCollapseRide should set expandedIndex to undefined if ride is already expanded', () => {
    // Arrange
    component.expandedIndex = 2;

    // Act
    component.onExpandCollapseRide(2);

    // Assert
    expect(component.expandedIndex).toBeUndefined();
  });

  it('#onClickAddNewRide should add new default ride to list, trigger auto-save and expand the new ride', () => {
    // Act
    component.onClickAddNewRide();

    // Assert
    const newDefaultRide: Ride = {
      name: '',
      typeId: undefined,
      age: RideAge.LessThan5Months,
      excitement: undefined,
      intensity: undefined,
      nausea: undefined,
      duplicates: []
    };

    expect(component.rides[3]).toEqual(newDefaultRide);
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
    expect(component.expandedIndex).toBe(3);
  });

  it('#onClickAttemptDeleteAllRides should show the delete all rides modal asking for confirmation', () => {
    // Act
    component.onClickAttemptDeleteAllRides();
    fixture.detectChanges();

    // Assert
    const deleteAllRidesModal = fixture.debugElement.query(By.css('div[data-test-id="delete-all-rides-modal"]')).nativeElement;
    expect(deleteAllRidesModal.getAttribute('class')).toContain('is-active');
  });

  it('#onCloseDeleteAllRidesModal should hide the delete all rides modal asking for confirmation', () => {
    // Arrange
    component.isDeleteAllRidesModalActive = true;
    fixture.detectChanges();

    // Act
    component.onCloseDeleteAllRidesModal();
    fixture.detectChanges();

    // Assert
    const deleteAllRidesModal = fixture.debugElement.query(By.css('div[data-test-id="delete-all-rides-modal"]')).nativeElement;
    expect(deleteAllRidesModal.getAttribute('class')).not.toContain('is-active');
  });

  it('#onDeleteAllRides should close the delete all rides modal, delete all rides and trigger auto-save', () => {
    // Arrange
    component.isDeleteAllRidesModalActive = true;
    fixture.detectChanges();

    // Act
    component.onDeleteAllRides();
    fixture.detectChanges();

    // Assert
    const deleteAllRidesModal = fixture.debugElement.query(By.css('div[data-test-id="delete-all-rides-modal"]')).nativeElement;
    expect(deleteAllRidesModal.getAttribute('class')).not.toContain('is-active');
    expect(component.rides).toEqual([]);
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
  });

  it('#onSaveAll should trigger auto-save', () => {
    // Act
    component.onSaveAll();

    // Assert
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
  });
});
