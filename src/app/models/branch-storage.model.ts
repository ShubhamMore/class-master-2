export class BranchStorageModel {
  constructor(
    public _id: string,
    public branch: string,
    public regularStorageAssigned: number,
    public storagePackage: string,
    public extraStorageAssigned: number,
    public extraStorageExpireOn: string,
    public totalStorageAssigned: number,
    public totalStorageUsed: number,
  ) {}
}
