import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RideListComponent } from './ride-list.component';

import { GameVersion } from './../shared/enums/game-version';
import { PersistenceService } from './../shared/services/persistence.service';
import { PriceConverterService } from './../shared/services/price-converter.service';
import { Ride } from './../shared/models/ride.model';
import { RideAge } from '../shared/enums/ride-age';
import { RideDuplicateFlaggerService } from './../shared/services/ride-duplicate-flagger.service';
import { RidePriceCalculatorService } from './../shared/services/ride-price-calculator.service';
import { RideService } from './../shared/services/ride.service';
import { SaveData } from './../shared/models/save-data.model';
import { AdmissionMode } from '../shared/models/park.model';

describe('RideListComponent', () => {
  let component: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;

  let saveData: SaveData;

  const persistenceServiceSpy = jasmine.createSpyObj('PersistenceService', ['save', 'load']);
  const priceConverterServiceSpy = jasmine.createSpyObj('PriceConverterService', ['parkEntrancePrice']);
  const rideDuplicateFlaggerServiceSpy = jasmine.createSpyObj('RideDuplicateFlaggerService', ['flag']);
  const ridePriceCalculatorServiceSpy = jasmine.createSpyObj('RidePriceCalculatorService', ['recommendedParkEntranceFee']);

  const rideServiceSpy = jasmine.createSpyObj('RideService', ['getInitialName']);
  rideServiceSpy.getInitialName.and.returnValue('Test Name 1');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RideListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: PersistenceService, useValue: persistenceServiceSpy },
        { provide: PriceConverterService, useValue: priceConverterServiceSpy },
        { provide: RideDuplicateFlaggerService, useValue: rideDuplicateFlaggerServiceSpy },
        { provide: RidePriceCalculatorService, useValue: ridePriceCalculatorServiceSpy },
        { provide: RideService, useValue: rideServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    saveData = {
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
    persistenceServiceSpy.load.and.returnValue(saveData);
    persistenceServiceSpy.save.calls.reset();

    rideDuplicateFlaggerServiceSpy.flag.calls.reset();

    fixture = TestBed.createComponent(RideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    component.isWhatsNewModalActive = false;
    component.isRecommendedParkEntranceFeeModalActive = false;
    component.isDeleteAllRidesModalActive = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should not load up the what\'s new modal for first-time visitors', () => {
    // Arrange
    saveData = undefined;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.isWhatsNewModalActive).toBeFalse();
  });

  it('#ngOnInit should load up the what\'s new modal for visitors who\'ve seen versions <= 1.1.0', () => {
    // Arrange
    saveData.appVersion = undefined;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.isWhatsNewModalActive).toBeTrue();
  });

  it('#ngOnInit should load up the what\'s new modal for visitors who\'ve seen version 1.2.0', () => {
    // Arrange
    saveData.appVersion = '1.2.0';

    // Act
    component.ngOnInit();

    // Assert
    expect(component.isWhatsNewModalActive).toBeTrue();
  });

  it('#ngOnInit should not load up the what\'s new modal for visitors who\'ve seen version 1.3.0', () => {
    // Arrange
    saveData.appVersion = '1.3.0';

    // Act
    component.ngOnInit();

    // Assert
    expect(component.isWhatsNewModalActive).toBeFalse();
  });

  it('#ngOnInit should update the save data appVersion to 1.3.0', () => {
    // Arrange
    saveData.appVersion = undefined;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.saveData.appVersion).toBe('1.3.0');
  });

  it('#ngOnInit should set park entrance fee / free ride admission mode if legacy hasEntranceFee option was checked', () => {
    // Arrange
    saveData.parks[0].hasEntranceFee = true;
    saveData.parks[0].admissionMode = AdmissionMode.FreeParkEntryPayPerRide;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.saveData.parks[0].admissionMode).toBe(AdmissionMode.PayToEnterParkFreeRides);
  });

  it('#ngOnInit should clear out legacy hasEntranceFee option', () => {
    // Arrange
    saveData.parks[0].hasEntranceFee = true;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.saveData.parks[0].hasEntranceFee).toBeUndefined();
  });

  it('#onClickCloseWhatsNewModal should close the what\'s new modal', () => {
    // Arrange
    component.isWhatsNewModalActive = true;
    fixture.detectChanges();

    // Act
    component.onClickCloseWhatsNewModal();
    fixture.detectChanges();

    // Assert
    const onClickRecommendedParkEntranceFeeModal = fixture.debugElement.query(By.css('div[data-test-id="whats-new-modal"]')).nativeElement;
    expect(onClickRecommendedParkEntranceFeeModal.getAttribute('class')).not.toContain('is-active');
  });

  it('#getRecommendedParkEntranceFeeString should display the correct value', () => {
    // Arrange
    priceConverterServiceSpy.parkEntrancePrice.and.returnValue('£35.00');

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

  it('#onChangeParkAdmissionMode should trigger auto-save', () => {
    // Act
    component.onChangeParkAdmissionMode();

    // Assert
    expect(persistenceServiceSpy.save).toHaveBeenCalled();
  });

  it('#onChangeParkAdmissionMode should reset showGoodValuePrice if park is pay for entry / free rides', () => {
    // Arrange
    component.park.showGoodValuePrice = true;
    component.park.admissionMode = AdmissionMode.PayToEnterParkFreeRides;

    // Act
    component.onChangeParkAdmissionMode();

    // Assert
    expect(component.park.showGoodValuePrice).toBeFalse();
  });

  it('#onChangeParkAdmissionMode should hide showGoodValuePrice if park is pay for entry / pay for rides', () => {
    // Arrange
    component.park.showGoodValuePrice = true;
    component.park.admissionMode = AdmissionMode.PayToEnterParkPayPerRide;

    // Act
    component.onChangeParkAdmissionMode();

    // Assert
    expect(component.park.showGoodValuePrice).toBeFalse();
  });

  it('#onClickRecommendedParkEntranceFeeWhy should show park entrance fee explanation modal', () => {
    // Arrange
    component.park.admissionMode = AdmissionMode.PayToEnterParkFreeRides;
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
    component.park.admissionMode = AdmissionMode.PayToEnterParkFreeRides;
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

  it('#onClickAddNewRide should empty ride to list, trigger auto-save and expand the new ride', () => {
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

    expect(persistenceServiceSpy.save).toHaveBeenCalled();
    expect(component.rides[3]).toEqual(newDefaultRide);
    expect(component.expandedRideIndex).toBe(3);
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

  it('#onClickDeleteAllRides should close the delete all rides modal, delete all rides and trigger auto-save', () => {
    // Arrange
    component.isDeleteAllRidesModalActive = true;
    fixture.detectChanges();

    // Act
    component.onClickDeleteAllRides();
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
