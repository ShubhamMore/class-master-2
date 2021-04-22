import { DateService, Month } from './../../../../services/shared-services/date.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BudgetService } from '../../../../services/budget.service';
import { BranchService } from '../../../../services/branch.service';
import { BudgetModel } from '../../../../models/budget.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService, NbThemeService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-manage-budget',
  templateUrl: './manage-budget.component.html',
  styleUrls: ['./manage-budget.component.scss'],
})
export class ManageBudgetComponent implements OnInit {
  loading: boolean;
  private branchId: string;

  incomes: BudgetModel[];
  expenses: BudgetModel[];

  months: Month[];
  years: string[];

  month: string;
  year: string;

  themeSubscription: any;
  themeConfig: any;

  constructor(
    private budgetService: BudgetService,
    private branchService: BranchService,
    private dialogService: NbDialogService,
    public dateService: DateService,
    public toastrService: NbToastrService,
    private themeService: NbThemeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.back();
      return;
    }

    this.incomes = [];
    this.expenses = [];

    this.themeSubscription = this.themeService.getJsTheme().subscribe((config: any) => {
      this.themeConfig = config;
    });

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();

    this.month = this.dateService.getCurrentMonth();
    this.budgetService.setMonth(this.month);
    this.year = this.dateService.getCurrentYear();
    this.budgetService.setYear(this.year);

    this.searchBudget();
  }

  addIncomeExpense() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  viewStatement() {
    this.router.navigate(['../summery'], { relativeTo: this.route });
  }

  getAmount(amount: any) {
    amount = +amount;
    return amount.toFixed(2).toString() + '/-';
  }

  onSelectYear(year: string) {
    this.year = year;
    this.budgetService.setYear(year);
    if (year === '') {
      this.month = '';
    }
    this.searchBudget();
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.budgetService.setMonth(this.month);
    this.searchBudget();
  }

  openChart(dialog: TemplateRef<any>) {
    const colors: any = this.themeConfig.variables;
    const chartjs: any = this.themeConfig.variables.chartjs;

    const chartData = {
      data: {
        labels: ['Income', 'Expense'],
        datasets: [
          {
            data: [this.getTotalIncome(), this.getTotalExpense()],
            backgroundColor: [colors.warningLight, colors.dangerLight],
          },
        ],
      },

      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      },
    };
    this.dialogService.open(dialog, { context: chartData });
  }

  searchBudget() {
    this.loading = true;
    this.budgetService.getBudgetForBranch(this.branchId, this.month, this.year).subscribe(
      (budgetData: { incomes: BudgetModel[]; expenses: BudgetModel[] }) => {
        this.incomes = budgetData.incomes;
        this.expenses = budgetData.expenses;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  getTotalIncome() {
    let totalIncome = 0;
    this.incomes.forEach((income: BudgetModel) => {
      totalIncome += income.amount;
    });
    return totalIncome;
  }

  getTotalExpense() {
    let totalExpense = 0;
    this.expenses.forEach((expense: BudgetModel) => {
      totalExpense += expense.amount;
    });
    return totalExpense;
  }

  getTotalBalance() {
    const totalIncomes = this.getTotalIncome();
    const totalExpenses = this.getTotalExpense();
    return totalIncomes - totalExpenses;
  }

  deleteBudget(id: string, i: number, type: string) {
    this.budgetService.deleteBudget(id).subscribe(
      (budget: any) => {
        if (type === 'income') {
          this.incomes.splice(i, 1);
          this.showToastr('top-right', 'success', 'Income Deleted Successfully!!');
        } else {
          this.expenses.splice(i, 1);
          this.showToastr('top-right', 'success', 'Expense Deleted Successfully!!');
        }
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
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

  OnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
