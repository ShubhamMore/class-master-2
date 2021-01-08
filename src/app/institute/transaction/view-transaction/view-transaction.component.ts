import { DateService } from './../../../services/shared-services/date.service';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { InstituteTransactionModel } from './../../../models/institute-transaction.model';
import { TransactionService } from './../../../services/transaction.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss'],
})
export class ViewTransactionComponent implements OnInit, OnDestroy {
  loading: boolean;
  transaction: InstituteTransactionModel;
  address: string;
  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
    public dateService: DateService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.address = environment.address;

    this.transactionService
      .getInstituteTransactionData()
      .subscribe((transaction: InstituteTransactionModel) => {
        if (!transaction) {
          this.showToastr('top-right', 'danger', 'Transaction Not Available');
          this.back();
        }

        this.transaction = transaction;
        this.loading = false;
      });
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

  ngOnDestroy() {}
}
