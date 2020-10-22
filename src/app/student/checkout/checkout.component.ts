import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CheckoutService } from '../../services/checkout.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'ngx-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutData: any;

  constructor(
    private checkoutService: CheckoutService,
    private paymentService: PaymentService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<CheckoutComponent>,
  ) {}

  ngOnInit(): void {
    this.checkoutData = this.paymentService.getInstitutePaymentDetails();
  }

  onClose() {
    this.ref.close({ status: false });
  }

  checkout() {
    this.ref.close({ status: true });
  }
}
