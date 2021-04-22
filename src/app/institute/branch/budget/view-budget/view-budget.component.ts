import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.scss'],
})
export class ViewBudgetComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getAmount(amount: any) {
    amount = +amount;
    return amount.toFixed(2).toString() + '/-';
  }
}
