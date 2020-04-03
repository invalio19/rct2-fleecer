import { Injectable } from '@angular/core';
import { RideAge } from '../models/ride-age.model';

@Injectable({
  providedIn: 'root'
})
export class RideAgeRepositoryService {
  private vanillaRct2RideAges: RideAge[] = [
    new RideAge(0,   5,  1,    1, 30),
    new RideAge(1,  13,  1,    1, 10),
    new RideAge(2,  40,  1,    1,  0),
    new RideAge(3,  64,  3,    4,  0),
    new RideAge(4,  88,  9,   16,  0),
    new RideAge(5, 104, 27,   64,  0),
    new RideAge(6, 120, 81,  256,  0),
    new RideAge(7, 128, 81,  512,  0),
    new RideAge(8, 200, 81, 1024,  0),
    new RideAge(9, 200,  9,   16,  0)
  ];

  private openRct2RideAges: RideAge[] = [
    new RideAge(0,   5,  3,    2, 0),
    new RideAge(1,  13,  6,    5, 0),
    new RideAge(2,  40,  1,    1, 0),
    new RideAge(3,  64,  3,    4, 0),
    new RideAge(4,  88,  9,   16, 0),
    new RideAge(5, 104, 27,   64, 0),
    new RideAge(6, 120, 81,  256, 0),
    new RideAge(7, 128, 81,  512, 0),
    new RideAge(8, 200, 81, 1024, 0),
    new RideAge(9, 200,  9,   16, 0)
  ];

  getAll(): RideAge[] {
    return this.vanillaRct2RideAges;
  }

  get(id: number): RideAge {
    return this.vanillaRct2RideAges[id]; // TODO for openRct2
  }

  isLastEntry(id: number): boolean {
    return id === this.vanillaRct2RideAges.length - 1; // TODO
  }
}
