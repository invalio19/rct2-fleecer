import { Component, OnInit } from '@angular/core';

import { GameVersion } from '../shared/enums/game-version';
import { Park, AdmissionMode } from '../shared/models/park.model';
import { PersistenceService } from './../shared/services/persistence.service';
import { Ride } from '../shared/models/ride.model';
import { RideAge } from '../shared/enums/ride-age';
import { RideDuplicateFlaggerService } from './../shared/services/ride-duplicate-flagger.service';
import { RidePriceCalculatorService } from './../shared/services/ride-price-calculator.service';
import { PriceConverterService } from './../shared/services/price-converter.service';
import { RideType } from '../shared/models/ride-type.model';
import { RideTypeRepositoryService } from './../shared/services/ride-type-repository.service';
import { SaveData } from '../shared/models/save-data.model';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html'
})
export class RideListComponent implements OnInit {
  AdmissionMode = AdmissionMode;
  GameVersion = GameVersion;
  saveData: SaveData;
  park: Park;
  rides: Ride[];

  expandedRideIndex: number;
  isWhatsNewModalActive = false;
  isRecommendedParkEntranceFeeModalActive = false;
  rideTypeOptions: RideType[];
  isDeleteAllRidesModalActive = false;

  private appVersion = '1.4.0'; // TODO pass into footer app too

  constructor(
    private persistenceService: PersistenceService,
    private rideDuplicateFlaggerService: RideDuplicateFlaggerService,
    private ridePriceCalculatorService: RidePriceCalculatorService,
    private ridePriceConverterService: PriceConverterService,
    private rideTypeRepositoryService: RideTypeRepositoryService) {
      this.saveData = this.persistenceService.load();
      this.rideTypeOptions = this.rideTypeRepositoryService.getAll();
  }

  ngOnInit(): void {
    // TODO this should all be moved out into a home component or something
    if (this.saveData === undefined) {
      // Never visited page before
      this.saveData = this.getDefaultSaveData();
      this.saveAll();
    }
    else if (this.saveData.appVersion !== this.appVersion) {
      // Visited when app version was <= 1.1.0
      this.isWhatsNewModalActive = true;
      this.saveData.appVersion = this.appVersion;
      this.saveAll();
    }

    // For manually testing as though user last viewed version <= 1.1.0
    // this.saveData.appVersion = undefined;
    // this.saveAll();

    this.park = this.saveData.parks[0];

    // Backwards compatibility
    if (this.park.hasEntranceFee) {
      this.park.admissionMode = AdmissionMode.PayToEnterParkFreeRides;
    }
    this.park.hasEntranceFee = undefined;
    this.saveAll();

    this.rides = this.park.rides;
    this.rideDuplicateFlaggerService.flag(this.rides);
  }

  onClickCloseWhatsNewModal(): void {
    this.isWhatsNewModalActive = false;
  }

  onClickGameVersion(gameVersion: GameVersion) {
    this.saveData.options.gameVersion = gameVersion;
    this.saveAll();
  }

  onChangeParkAdmissionMode() {
    if (this.park.admissionMode === AdmissionMode.PayToEnterParkFreeRides ||
        this.park.admissionMode === AdmissionMode.PayToEnterParkPayPerRide) {
      this.park.showGoodValuePrice = false;
    }

    this.saveAll();
  }

  onChangeShowGoodValuePrices() {
    this.saveAll();
  }

  getRecommendedParkEntranceFeeString(): string {
    const price = this.ridePriceCalculatorService.recommendedParkEntranceFee(this.saveData.options.gameVersion, this.park.rides, this.park.admissionMode);
    return this.ridePriceConverterService.parkEntrancePrice(price);
  }

  onClickRecommendedParkEntranceFeeWhy() {
    this.isRecommendedParkEntranceFeeModalActive = true;
  }

  onCloseRecommendedParkEntranceFeeModal() {
    this.isRecommendedParkEntranceFeeModalActive = false;
  }

  onClickAddNewRide(): void {
    const ride: Ride = {
      name: '',
      typeId: undefined,
      age: RideAge.LessThan5Months,
      excitement: undefined,
      intensity: undefined,
      nausea: undefined,
      duplicates: []
    };

    this.rides.push(ride);
    this.rideDuplicateFlaggerService.flag(this.rides);

    this.saveAll();

    this.expandedRideIndex = this.rides.length - 1;
  }

  onClickAttemptDeleteAllRides() {
    this.isDeleteAllRidesModalActive = true;
  }

  onCloseDeleteAllRidesModal() {
    this.isDeleteAllRidesModalActive = false;
  }

  onClickDeleteAllRides() {
    this.onCloseDeleteAllRidesModal();
    this.rides.length = 0;
    this.saveAll();
  }

  onSaveAll() {
    this.saveAll();
  }

  // @Outputs
  onRideExpandToggled(index: number) {
    if (this.expandedRideIndex !== index) {
      this.expandedRideIndex = index;
    }
    else {
      this.expandedRideIndex = undefined;
    }
  }

  private getDefaultSaveData(): SaveData {
    const saveData: SaveData = {
      appVersion: this.appVersion,
      options: { gameVersion: GameVersion.VanillaRct2 },
      parks: [
        {
          name: '',
          admissionMode: AdmissionMode.FreeParkEntryPayPerRide,
          showGoodValuePrice: false,
          rides: []
        }
      ]
    };

    return saveData;
  }

  private saveAll() {
    this.persistenceService.save(this.saveData);
  }
}
