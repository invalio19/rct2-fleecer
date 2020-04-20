import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitConverterService {
  // https://github.com/OpenRCT2/OpenRCT2/blob/116bcb5ccbe949a31ff3312db1fe9bb6a1e26a4d/src/openrct2/util/Util.cpp

  metresToFeet(metres: number): number {
    return Math.floor(metres * 840 / 256);
  }

  mphToKmph(mph: number): number {
    // tslint:disable-next-line: no-bitwise
    return (mph * 1648) >> 10;
  }
}
