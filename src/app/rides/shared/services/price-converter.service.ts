import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceConverterService {
  ridePrice(price: number): string {
    if (!price) {
      return 'Free';
    }
    price = price / 10;
    price = Math.min(price, 20);
    return '£' + price.toFixed(2);
  }

  parkEntrancePrice(price: number): string {
    if (!price) {
      return 'Free';
    }
    price = Math.floor(price / 10);
    price = Math.min(price, 200);
    return '£' + price.toFixed(2);
  }
}
