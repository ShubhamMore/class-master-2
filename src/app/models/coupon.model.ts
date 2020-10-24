export class CouponModel {
  constructor(
    public _id: string,
    public code: string,
    public discountType: string,
    public discountAmount: string,
    public createdAt: string,
    public expiryDate: string,
    public description: string,
    public termsAndConditions: string,
    public status: boolean,
  ) {}
}
