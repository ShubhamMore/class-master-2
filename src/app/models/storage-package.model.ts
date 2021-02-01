export class StoragePackageModel {
  constructor(
    public _id: string,
    public storage: number,
    public price: number,
    public status: boolean,
  ) {}
}
