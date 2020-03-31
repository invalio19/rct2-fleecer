import { Injectable } from '@angular/core';
import { RideType } from './../shared/ride-type.model';

// @ts-ignore
import RideTypes from  '../../../assets/data/ride-types.json';

@Injectable({
  providedIn: 'root'
})
export class RideTypeRepositoryService {
  get(): RideType[] {
    return RideTypes;
  }
}
