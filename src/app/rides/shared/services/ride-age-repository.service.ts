import { GameVersion } from './../game-version';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RideAgeRepositoryService {
  private vanillaRct2RideAgeTable: number[][] = [
    // months, multiplier, divisor, summand
    [  5,  1,    1, 30],
    [ 13,  1,    1, 10],
    [ 40,  1,    1,  0],
    [ 64,  3,    4,  0],
    [ 88,  9,   16,  0],
    [104, 27,   64,  0],
    [120, 81,  256,  0],
    [128, 81,  512,  0],
    [200, 81, 1024,  0],
    [200,  9,   16,  0]
  ];

  private openRct2RideAgeTable: number[][] = [
    // months, multiplier, divisor, summand
    [  5,  3,    2, 0],
    [ 13,  6,    5, 0],
    [ 40,  1,    1, 0],
    [ 64,  3,    4, 0],
    [ 88,  9,   16, 0],
    [104, 27,   64, 0],
    [120, 81,  256, 0],
    [128, 81,  512, 0],
    [200, 81, 1024, 0],
    [200,  9,   16, 0]
  ];

  getAll(gameVersion: GameVersion): number[][] {
    switch (gameVersion) {
      case GameVersion.VanillaRct2:
        return this.vanillaRct2RideAgeTable;
      case GameVersion.OpenRct2:
        return this.openRct2RideAgeTable;
      default:
        // todo error log
        break;
    }
  }

  get(index: number, gameVersion: GameVersion): number[] {
    const all = this.getAll(gameVersion);
    return all[index];
  }

  isLastEntry(id: number): boolean {
    return id === this.vanillaRct2RideAgeTable.length - 1; // TODO
  }
}
