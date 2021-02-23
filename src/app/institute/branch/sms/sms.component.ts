import { CheckoutComponent } from './../../checkout/checkout.component';
import { PaymentComponent } from './../../payment/payment.component';
import { PaymentService } from './../../../services/payment.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DateService } from './../../../services/shared-services/date.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchSMSService } from './../../../services/branch-sms.service';
import { BranchService } from './../../../services/branch.service';
import { SMSPackageService } from './../../../services/sms-package.service';
import { SMSPackageModel } from './../../../models/sms-package.model';
import { BranchSMSModel } from './../../../models/branch-sms.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss'],
})
export class SmsComponent implements OnInit {
  loading: boolean;
  branchId: string;

  BranchSMS: BranchSMSModel;
  smsPackages: SMSPackageModel[];

  totalSms: string;
  usedSms: string;
  availableSms: string;
  usedSmsInPercentage: number;

  paymentDetails: { planType: string; packageType: string; amount: string };

  constructor(
    private branchService: BranchService,
    private dialogService: NbDialogService,
    private paymentService: PaymentService,
    private smsPackageService: SMSPackageService,
    private branchSMSService: BranchSMSService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public dateService: DateService,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.branchSMSService.getBranchSMS(this.branchId).subscribe(
      (BranchSMS: BranchSMSModel) => {
        this.BranchSMS = BranchSMS;

        this.smsPackageService.getSMSPackages().subscribe(
          (smsPackages: SMSPackageModel[]) => {
            this.smsPackages = smsPackages;
            this.loading = false;
          },
          (error: any) => {
            this.showToastr('top-right', 'danger', error);
            this.loading = false;
          },
        );
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  onClosePayment(order: any) {
    if (order.status) {
      this.updateSms(order.order, order.receipt);
    }
  }

  private updateSms(order: string, receipt: string) {
    this.branchSMSService
      .updateBranchSMS(this.branchId, this.paymentDetails.packageType, order, receipt)
      .subscribe(
        (res: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
        },
      );
  }

  onCheckout(checkout: any) {
    if (checkout.status) {
      this.dialogService
        .open(PaymentComponent, {
          context: {},
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((order: any) => order && this.onClosePayment(order));
    }
  }

  activate(SMSPackage: SMSPackageModel) {
    const amount: string = SMSPackage.price.toString();

    this.paymentService.setPaymentDetails('sms', SMSPackage.packageName, amount);

    this.paymentDetails = this.paymentService.getPaymentDetails();
    this.dialogService
      .open(CheckoutComponent, {
        context: {},
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe((checkout: any) => checkout && this.onCheckout(checkout));
  }

  getAmount(amount: any) {
    amount = parseFloat(amount.toString());
    return amount.toFixed(2).toString();
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
