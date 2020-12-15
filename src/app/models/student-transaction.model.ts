import { InstallmentModel } from './student-course-installment.model';
import { CourseBasicDetailsModel } from './course.model';

export class StudentTransactionModel {
  constructor(
    public _id: string,
    public order_id: string,
    public userId: string,
    public userName: string,
    public userPhone: string,
    public userEmail: string,
    public imsMasterId: string,
    public coupon: string,
    public branch: string,
    public amount: string,
    public planType: string,
    public packageType: string,
    public createdAt: string,
    public orderId: string,
    public status: boolean,
    public courseBasicDetails: CourseBasicDetailsModel,
    public installment: InstallmentModel,
  ) {}
}
