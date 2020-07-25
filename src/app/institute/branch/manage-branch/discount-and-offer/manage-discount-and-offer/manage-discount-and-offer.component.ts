import { DateService } from './../../../../../services/shared-services/date.service';
import { DiscountAndOfferService } from './../../../../../services/discount-and-offer.service';
import { BranchService } from './../../../../../services/branch.service';
import { DiscountAndOfferModel } from './../../../../../models/discount-and-offer.model';
import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-manage-discount-and-offer',
  templateUrl: './manage-discount-and-offer.component.html',
  styleUrls: ['./manage-discount-and-offer.component.scss'],
})
export class ManageDiscountAndOfferComponent implements OnInit {
  loading: boolean;
  branchId: string;
  discountAndOffers: DiscountAndOfferModel[];

  constructor(
    private branchService: BranchService,
    public dateService: DateService,
    private discountAndOfferService: DiscountAndOfferService,
    private toastrService: NbToastrService,

    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.discountAndOffers = [];

    this.getDiscountAndOffers();
  }

  getDiscountAndOffers() {
    this.loading = true;
    this.discountAndOfferService.getDiscountAndOffers(this.branchId).subscribe(
      (discountAndOffers: DiscountAndOfferModel[]) => {
        this.discountAndOffers = discountAndOffers;
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      },
    );
  }

  addDiscountAndOffer() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  editDiscountAndOffer(id: string) {
    this.discountAndOfferService.setDiscountAndOfferId(id);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  changeDiscountAndOfferStatus(id: string, status: boolean, i: number) {
    this.loading = true;
    this.discountAndOfferService.changeDiscountAndOfferStatus(id, status).subscribe(
      (res: any) => {
        this.discountAndOffers[i].status = status;
        this.showToastr(
          'top-right',
          'success',
          `DiscountAndOffer ${status ? 'Activated' : 'Deactivated'} Successfully!`,
        );
        this.loading = false;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.loading = false;
      },
    );
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
