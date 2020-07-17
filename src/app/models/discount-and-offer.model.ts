export class DiscountAndOfferModel {
  constructor(
    public _id: string,
    public branch: string,
    public code: string,
    public discountType: string,
    public discountAmount: string,
    public startDate: string,
    public expiryDate: string,
    public termsAndConditions: string,
    public status: boolean,
  ) {}
}
