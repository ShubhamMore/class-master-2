export class EmployeeSalaryModel {
  constructor(
    public _id: string,
    public employee: string,
    public branch: string,
    public date: string,
    public month: string,
    public year: string,
    public basicAmount: string,
    public description: string,
    public earnings: ExtraSalaryModel[],
    public deductions: ExtraSalaryModel[],
    public generatedBy: string,
    public paymentMode: string,
    public bankDetails: string,
    public transactionDetails: string,
    public netSalary: string,
    public netSalaryInWords: string,
    public status: boolean,
  ) {}
}

export class ExtraSalaryModel {
  constructor(public _id: string, public description: string, public amount: number) {}
}
