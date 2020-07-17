export class DiscountAndOfferModel {
  constructor(
    public _id: string,
    public branch: string,
    public offerName: string,
    public code: string,
    public discountType: string,
    public discountAmount: string,
    public startDate: string,
    public expiryDate: string,
    public description: string,
    public termsAndConditions: string,
    public status: boolean,
  ) {}
}
