export class SMSPackageModel {
  constructor(
    public _id: string,
    public smsCount: number,
    public price: number,
    public status: boolean,
  ) {}
}
