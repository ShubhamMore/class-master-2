export class StudentCourseModel {
  constructor(
    public _id: string,
    public student: string,
    public branch: string,
    public category: string,
    public course: string,
    public batch: string,
    public activationDate: string,
    public rollNumber: string,
    public discount: string,
    public additionalDiscountType: string,
    public additionalDiscountAmount: number,
    public netPayable: number,
    public status: boolean,
  ) {}
}
