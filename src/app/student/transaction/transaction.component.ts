import { DateService } from './../../services/shared-services/date.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TransactionService } from './../../services/transaction.service';
import { StudentTransactionModel } from './../../models/student-transaction.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  loading: boolean;
  transactions: StudentTransactionModel[];

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
    public dateService: DateService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.transactionService.getStudentTransactions().subscribe(
      (transactions: StudentTransactionModel[]) => {
        this.transactions = transactions;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  viewTransaction(transaction: StudentTransactionModel) {
    this.transactionService.setStudentTransactionData(transaction);
    this.router.navigate(['./view'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
