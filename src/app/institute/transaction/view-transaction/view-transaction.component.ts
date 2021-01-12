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

  amount: string;
  gstAmount: string;
  totalAmount: string;

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

        const receiptAmount = +transaction.amount;

        const gstAmount = receiptAmount * 0.18;
        const amount = receiptAmount - gstAmount;

        this.gstAmount = gstAmount.toFixed(2);
        this.amount = amount.toFixed(2);

        this.totalAmount = receiptAmount.toFixed(2);

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
