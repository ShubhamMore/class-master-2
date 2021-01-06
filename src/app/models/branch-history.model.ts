export class BranchHistoryModel {
  constructor(
    public _id: string,
    public amount: string,
    public activationDate: string,
    public expiryDate: string,
    public planType: string,
  ) {}
}
