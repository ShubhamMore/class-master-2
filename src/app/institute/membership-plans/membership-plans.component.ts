import { MembershipPlanModel } from './../../models/membership-plan.model';
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
  loading: boolean;
  submit: boolean;

  branchId: string;
  membershipType: string;
  paymentDetails: any;

  membershipPlans: MembershipPlanModel[];

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
    this.loading = true;
    this.submit = false;

    this.branchId = this.branchService.getBranchId();
    this.membershipType = this.membershipService.getMembershipType();

    if (this.membershipType !== 'renew') {
      this.branchService.setBranchId('');
      this.branchId = null;
    }

    this.membershipPlans = [];

    this.getMembershipPlans();

    this.menuService.hideMenu();
  }

  getMembershipPlans() {
    this.membershipService.getMemberships().subscribe(
      (membershipPlans: MembershipPlanModel[]) => {
        this.membershipPlans = membershipPlans;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      },
    );
  }

  getPrice(name: string) {
    const membershipPlan = this.getMembership(name);

    if (membershipPlan) {
      const price = parseFloat(membershipPlan.price.toString());
      return price.toFixed(2).toString() + '/-';
    } else {
      return '--';
    }
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

  getMembership(name: string) {
    return this.membershipPlans.find(
      (curMembershipPlan: MembershipPlanModel) => curMembershipPlan.name === name,
    );
  }

  isMembershipPlanAvailable(name: string): boolean {
    const membershipPlan = this.getMembership(name);

    if (membershipPlan) {
      return true;
    }
    return false;
  }

  activate(planType: string, packageType: string) {
    const membershipPlan = this.getMembership(packageType);

    if (membershipPlan) {
      this.paymentService.setPaymentDetails(planType, packageType, membershipPlan.price);

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
  }

  private activateBranch(id: string, orderId: string, ReceiptId: string) {
    this.submit = true;

    const paymentDetails = {
      amount: this.paymentDetails.amount,
      planType: this.paymentDetails.planType,
      packageType: this.paymentDetails.packageType,
      orderId: orderId,
      receiptId: ReceiptId,
    };
    this.branchService.activateBranch(id, paymentDetails).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'Institute Activated Successfully');
        this.router.navigate(['/institute'], { relativeTo: this.route });
      },
      (error: any) => {
        this.submit = false;
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
