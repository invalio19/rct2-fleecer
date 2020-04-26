import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { RideComponent } from './ride.component';
import { FooterComponent } from './../../shared/layout/footer/footer.component';

import { AdmissionMode } from '../shared/models/park.model';
import { GameVersion } from '../shared/enums/game-version';
import { RideAge } from '../shared/enums/ride-age';

describe('RideComponent integration', () => {
  let component: RideComponent;
  let fixture: ComponentFixture<RideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RideComponent, FooterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideComponent);
    component = fixture.componentInstance;

    component.saveData = {
      appVersion: '1.3.0',
      options: {
        gameVersion: GameVersion.OpenRct2
      },
      parks: [
        {
          name: '',
          admissionMode: AdmissionMode.FreeParkEntryPayPerRide,
          showGoodValuePrice: false,
          rides: [
            {
              name: 'Ride 1',
              typeId: 'juniorRollerCoaster',
              age: RideAge.LessThan5Months,
              excitement: 1.5,
              intensity: 2.5,
              nausea: 3.5,
              duplicates: ['Ride 2']
            },
            {
              name: 'New ride name that isn\'t \'Ride 2\'',
              typeId: 'juniorRollerCoaster',
              age: RideAge.LessThan5Months,
              excitement: 1.5,
              intensity: 2.5,
              nausea: 3.5,
              duplicates: ['Ride 1']
            }
          ]
        }
      ]
    };
    component.ride = component.saveData.parks[0].rides[0];

    fixture.detectChanges();
  });

  it('#onChangeRideName should update names of other rides\' duplicates', () => {
    // Act
    component.onChangeRideName();

    // Assert
    expect(component.rides[0].duplicates).toEqual(['New ride name that isn\'t \'Ride 2\''])
  });
});
