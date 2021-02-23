import { DateService } from './../../services/shared-services/date.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransactionService } from './../../services/transaction.service';
import { InstituteTransactionModel } from './../../models/institute-transaction.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  loading: boolean;
  transactions: InstituteTransactionModel[];

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
    public dateService: DateService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.transactionService.getInstituteTransactions().subscribe(
      (transactions: InstituteTransactionModel[]) => {
        this.transactions = transactions;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  viewTransaction(transaction: InstituteTransactionModel) {
    this.transactionService.setInstituteTransactionData(transaction);
    this.router.navigate(['./view'], { relativeTo: this.route });
  }

  getAmount(amount: any) {
    amount = parseFloat(amount.toString());
    return amount.toFixed(2).toString();
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
