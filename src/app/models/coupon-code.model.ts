export class CouponCodeModel {
  constructor(
    public _id: string,
    public code: string,
    public discountType: string,
    public discountAmount: string,
    public createdAt: string,
    public expiryDate: string,
  ) {}
}
