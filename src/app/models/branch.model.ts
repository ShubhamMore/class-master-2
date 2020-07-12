export class BranchModel {
  constructor(
    public _id: string,
    public branchName: string,
    public branchCode: string,
    public state: string,
    public city: string,
    public address1: string,
    public address2: string,
    public pinCode: string,
    public email: string,
    public phone: string,
    public categories: CategoryModel[],
    public status: boolean,
  ) {}
}

export class CategoryModel {
  constructor(public _id: string, public category: string, public status: boolean) {}
}
