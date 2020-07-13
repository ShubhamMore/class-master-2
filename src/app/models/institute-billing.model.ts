export class InstituteBillingModel {
  constructor(
    public _id: string,
    public name: string,
    public address: string,
    public gstNumber: string,
    public termsAndConditions: string,
    public imsMasterId: string,
  ) {}
}
