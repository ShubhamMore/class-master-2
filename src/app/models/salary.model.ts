export class SalaryModel {
  constructor(
    public _id: string,
    public employee: string,
    public branch: string,
    public generatedBy: string,
    public date: string,
    public earnings: SalaryEarningModel[],
    public deductions: SalaryDeductionModel[],
    public description: string,
    public basicAmount: number,
    public netAmount: number,
    public netAmountInWords: string,
    public paymentMode: string,
    public bankDetails: string,
    public transactionDetails: string,
    public status: boolean,
  ) {}
}

export class SalaryEarningModel {
  constructor(public _id: string, public earning: string, public amount: number) {}
}

export class SalaryDeductionModel {
  constructor(public _id: string, public deduction: string, public amount: number) {}
}
