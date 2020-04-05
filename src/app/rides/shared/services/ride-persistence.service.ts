import { Injectable } from '@angular/core';

import { PersistenceService } from './persistence.service';
import { Ride } from '../models/ride.model';

@Injectable({
  providedIn: 'root'
})
export class RidePersistenceService {
  private db;
  private objectStore = 'ride';

  constructor(private persistenceService: PersistenceService) {}

  async connect(): Promise<void> {
    await this.persistenceService.connect(); // todo
    this.db = this.persistenceService.db;
  }

  async get(id: number): Promise<Ride> {
    return await this.db.get(this.objectStore, id);
  }

  async getAll(): Promise<Ride[]> {
    return await this.db.getAll(this.objectStore);
  }

  async put(ride: Ride): Promise<void> {
    const id = await this.db.put(this.objectStore, ride);
    ride.id = id;
  }

  async clear(): Promise<void> {
    await this.db.clear(this.objectStore);
  }
}
