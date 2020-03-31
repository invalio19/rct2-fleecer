import { Injectable } from '@angular/core';
import { RideAge } from '../models/ride-age.model';

@Injectable({
  providedIn: 'root'
})
export class RideAgeRepositoryService {
  private rideAgeArray: number[][] = [
    // months, multiplier, divisor, summand
    [   5,  1,    1, 30 ],
    [  13,  1,    1, 10 ],
    [  40,  1,    1,  0 ],
    [  64,  3,    4,  0 ],
    [  88,  9,   16,  0 ],
    [ 104, 27,   64,  0 ],
    [ 120, 81,  256,  0 ],
    [ 128, 81,  512,  0 ],
    [ 200, 81, 1024,  0 ],
    [ 200,  9,   16,  0 ]
  ];

  private rideAges: RideAge[];

  constructor() {
    const result = [];
    for (const r of this.rideAgeArray) {
      result.push(new RideAge(this.rideAgeArray.indexOf(r), r[0], r[1], r[2], r[3]));
    }
    console.log(result);
    this.rideAges = result;
  }

  getAll(): RideAge[] {
    return this.rideAges;
  }

  get(id: number): RideAge {
    return this.rideAges[id];
  }

  isLastEntry(id: number): boolean {
    return id === this.rideAges.length - 1;
  }
}
