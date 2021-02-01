export class StoragePackageModel {
  constructor(
    public _id: string,
    public packageName: string,
    public storage: number,
    public price: number,
    public validity: number,
    public status: boolean,
  ) {}
}
