import { DateService } from './../../../../services/shared-services/date.service';
import { BranchService } from './../../../../services/branch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../../../services/budget.service';
import { BudgetModel } from '../../../../models/budget.model';

@Component({
  selector: 'ngx-view-budget-summery',
  templateUrl: './view-budget-summery.component.html',
  styleUrls: ['./view-budget-summery.component.scss'],
})
export class ViewBudgetSummeryComponent implements OnInit {
  loading: boolean;
  budgetSummery: BudgetModel[];

  month: string;
  year: string;
  branchId: string;

  constructor(
    private budgetService: BudgetService,
    private branchService: BranchService,
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true;

    this.budgetSummery = [];

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.back();
      return;
    }

    this.month = this.budgetService.getMonth();
    this.year = this.budgetService.getYear();

    this.searchBudget();
  }

  getAmount(amount: any) {
    amount = +amount;
    return amount.toFixed(2).toString() + '/-';
  }

  searchBudget() {
    this.budgetService.getBudgetSummery(this.branchId, this.month, this.year).subscribe(
      (budget: BudgetModel[]) => {
        this.budgetSummery = budget;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      },
    );
  }

  getTotalIncome() {
    let totalIncome = 0;
    this.budgetSummery.forEach((curBudgetSummery: BudgetModel) => {
      if (curBudgetSummery.type === 'income') {
        totalIncome += curBudgetSummery.amount;
      }
    });
    return totalIncome;
  }

  getTotalExpense() {
    let totalExpense = 0;
    this.budgetSummery.forEach((curBudgetSummery: BudgetModel) => {
      if (curBudgetSummery.type === 'expense') {
        totalExpense += curBudgetSummery.amount;
      }
    });
    return totalExpense;
  }

  getTotalBalance() {
    const totalIncomes = this.getTotalIncome();
    const totalExpenses = this.getTotalExpense();
    return totalIncomes - totalExpenses;
  }

  getDuration() {
    const budgetSummeryLength = this.budgetSummery.length;
    if (budgetSummeryLength > 0) {
      const fromDate = this.dateService.formatDate(this.budgetSummery[0].date);
      const toDate = this.dateService.formatDate(this.budgetSummery[budgetSummeryLength - 1].date);
      return ' From ' + fromDate + ' To ' + toDate;
    }
    return '';
  }

  print() {
    window.print();
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
