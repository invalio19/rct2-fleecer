import { Injectable } from '@angular/core';

import { GameVersion } from '../enums/game-version';
import { SaveData } from '../models/save-data.model';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  private saveDataKey = 'saveData';

  save(data: SaveData): void {
    localStorage.setItem(this.saveDataKey, JSON.stringify(data));
  }

  load(): SaveData {
    const loadedData: SaveData = JSON.parse(localStorage.getItem(this.saveDataKey)); // These don't have the right reference objects

    if (loadedData) {
      return loadedData;
    }

    return undefined;
  }
}
