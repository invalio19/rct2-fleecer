import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideListComponent } from './ride-list.component';
import { FooterComponent } from './../../shared/layout/footer/footer.component';

import { RideAge } from '../shared/enums/ride-age';
import { FormsModule } from '@angular/forms';

describe('RideListComponent integration', () => {
  let component: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RideListComponent, FooterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#onChangeRideName should update names of other rides\' duplicates', () => {
    // Arrange
    component.rides.length = 0;
    component.rides.push({
      name: 'Ride 1',
      typeId: 'juniorRollerCoaster',
      age: RideAge.LessThan5Months,
      excitement: 1.5,
      intensity: 2.5,
      nausea: 3.5,
      duplicates: ['Ride 2']
    });
    component.rides.push({
      name: 'New ride name that isn\'t \'Ride 2\'',
      typeId: 'juniorRollerCoaster',
      age: RideAge.LessThan5Months,
      excitement: 1.5,
      intensity: 2.5,
      nausea: 3.5,
      duplicates: ['Ride 1']
    });

    // Act
    component.onChangeRideName();

    // Assert
    expect(component.rides[0].duplicates).toEqual(['New ride name that isn\'t \'Ride 2\''])
  });
});
