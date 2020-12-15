import { BranchAddressModel, BranchBasicDetailsModel } from './branch.model';

export class InstituteTransactionModel {
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
    public branchBasicDetails: BranchBasicDetailsModel,
    public branchAddress: BranchAddressModel,
  ) {}
}
