export class BudgetModel {
  constructor(
    public _id: string,
    public receipt: string,
    public salary: string,
    public generatedBy: string,
    public branch: string,
    public title: string,
    public amount: number,
    public type: string,
    public date: string,
  ) {}
}
