import { Injectable } from '@angular/core';

import { RideGroup } from './../models/ride-group.model';
import { RideGroupData } from '../../../data/ride-group-data';

@Injectable({
  providedIn: 'root'
})
export class RideGroupRepositoryService {
  get(id: string): RideGroup {
    return RideGroupData[id];
  }
}
