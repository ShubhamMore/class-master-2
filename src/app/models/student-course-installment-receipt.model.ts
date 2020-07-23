export class StudentCourseInstallmentReceiptModel {
  constructor(
    public _id: string,
    public student: string,
    public branch: string,
    public category: string,
    public course: string,
    public generatedBy: string,
    public date: string,
    public amount: number,
    public lateFee: number,
    public totalAmount: number,
    public totalAmountInWords: string,
    public paymentDate: string,
    public paymentMode: string,
    public description: string,
    public bankDetails: string,
    public transactionDetails: string,
    public amountDue: number,
    public status: boolean,
  ) {}
}
