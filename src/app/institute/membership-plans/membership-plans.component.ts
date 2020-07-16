import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from './../../services/payment.service';
import { BranchService } from './../../services/branch.service';
import { MenuService } from './../menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-membership-plans',
  templateUrl: './membership-plans.component.html',
  styleUrls: ['./membership-plans.component.scss'],
})
export class MembershipPlansComponent implements OnInit {
  constructor(
    private menuService: MenuService,
    private branchService: BranchService,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.branchService.setBranchId('');
    this.menuService.hideMenu();
  }

  activate(planType: string, amount: string) {
    this.paymentService.setPaymentDetails(planType, amount);
    this.router.navigate(['../add'], { relativeTo: this.route });
  }
}
