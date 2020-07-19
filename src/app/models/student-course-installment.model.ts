export class StudentCourseInstallmentModel {
  constructor(
    public _id: string,
    public student: string,
    public branch: string,
    public category: string,
    public course: string,
    public installmentType: string,
    public date: string,
    public noOfInstallments: number,
    public amountCollected: number,
    public totalAmount: number,
    public pendingAmount: number,
    public installments: InstallmentModel[],
  ) {}
}

export class InstallmentModel {
  constructor(
    public _id: string,
    public installmentNo: number,
    public installmentDate: string,
    public installmentAmount: number,
    public amountPending: number,
    public receiptId: string,
    public status: boolean,
  ) {}
}
