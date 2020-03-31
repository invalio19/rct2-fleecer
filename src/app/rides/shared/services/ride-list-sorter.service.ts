import { RideType } from './../models/ride-type.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RideListSorterService {
  sortByName(rideTypes: RideType[]): RideType[] {
    return rideTypes.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      else if (a.name > b.name) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }
}
