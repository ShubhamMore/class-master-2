export class BranchSMSModel {
  constructor(
    public _id: string,
    public branch: string,
    public smsCount: number,
    public smsUsed: number,
    public totalSMSUsed: number,
  ) {}
}
