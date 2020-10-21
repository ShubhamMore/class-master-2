import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private checkoutDetails: any;
  setCheckoutDetails(checkoutDetails: string) {
    this.checkoutDetails = checkoutDetails;
  }

  getCheckoutDetails() {
    return this.checkoutDetails;
  }
  constructor(private httpService: HttpService) {}
}
