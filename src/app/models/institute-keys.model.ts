export class InstituteKeysModel {
  constructor(
    public _id: string,
    public imsMasterId: string,
    public onlineClassesKeys: KeyModel,
    public paymentGatewayKeys: KeyModel,
  ) {}
}

export class KeyModel {
  constructor(public accessKey: string, public secretKey: string) {}
}
