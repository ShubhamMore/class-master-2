import { PaymentComponent } from './../payment/payment.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { CheckoutComponent } from './../checkout/checkout.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from './../../services/payment.service';
import { BranchService } from './../../services/branch.service';
import { MenuService } from './../menu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MembershipService } from '../../services/membership.service';

@Component({
  selector: 'ngx-membership-plans',
  templateUrl: './membership-plans.component.html',
  styleUrls: ['./membership-plans.component.scss'],
})
export class MembershipPlansComponent implements OnInit, OnDestroy {
  branchId: string;
  membershipType: string;
  paymentDetails: any;
  constructor(
    private menuService: MenuService,
    private branchService: BranchService,
    private membershipService: MembershipService,
    private paymentService: PaymentService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.branchId = this.branchService.getBranchId();
    this.membershipType = this.membershipService.getMembershipType();

    if (this.membershipType !== 'renew') {
      this.branchService.setBranchId('');
      this.branchId = null;
    }

    this.menuService.hideMenu();
  }

  onClosePayment(order: any) {
    if (order.status) {
      this.activateBranch(this.branchId, order.order, order.receipt);
    }
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

  activate(planType: string, packageType: string, amount: string) {
    this.paymentService.setPaymentDetails(planType, packageType, amount);

    if (this.branchId && this.membershipType === 'renew') {
      this.paymentDetails = this.paymentService.getPaymentDetails();
      this.dialogService
        .open(CheckoutComponent, {
          context: {},
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((checkout: any) => checkout && this.onCheckout(checkout));
    } else {
      this.router.navigate(['../add'], { relativeTo: this.route });
    }
  }

  private activateBranch(id: string, orderId: string, ReceiptId: string) {
    const paymentDetails = {
      amount: this.paymentDetails.amount,
      planType: this.paymentDetails.planType,
      orderId: orderId,
      receiptId: ReceiptId,
    };
    this.branchService.activateBranch(id, paymentDetails).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'Institute Activated Successfully');
        this.router.navigate(['/institute']);
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    if (this.branchId && this.membershipType === 'renew') {
      this.branchService.deleteBranchId();
      this.paymentService.deletePaymentDetails();
    }
  }
}
