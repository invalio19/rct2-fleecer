import { Injectable } from '@angular/core';

import { openDB } from '../../../../../node_modules/idb';

import { GameVersion } from '../enums/game-version';
import { SaveData } from '../models/save-data.model';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  db;

  private dbName = 'rct2-fleecer';
  private dbVersion = 1;

  async connect(): Promise<void> {
    this.db = await openDB(this.dbName, this.dbVersion, {
      upgrade(db) {
        db.createObjectStore('ride', { keyPath: 'id', autoIncrement: true });
      }
    });
  }

  load(): SaveData {
    const newData = {
      name: '',
      gameVersion: GameVersion.VanillaRct2,
      hasEntranceFee: false,
      rides: []
    };
    return newData;
  }

  async clearRides(): Promise<void> {
    await this.db.clear('ride');
  }
}
