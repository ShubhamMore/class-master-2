export class BranchModel {
  constructor(
    public _id: string,
    public basicDetails: BranchBasicDetailsModel,
    public address: BranchAddressModel,
    public categories: CategoryModel[],
    public currentPlanDetails: BranchPlanDetailsModel,
    public status: boolean,
  ) {}
}

export class BranchBasicDetailsModel {
  constructor(
    public _id: string,
    public branchName: string,
    public email: string,
    public phone: string,
  ) {}
}

export class BranchAddressModel {
  constructor(
    public _id: string,
    public state: string,
    public city: string,
    public address1: string,
    public address2: string,
    public pinCode: string,
  ) {}
}

export class CategoryModel {
  constructor(public _id: string, public category: string, public status: boolean) {}
}

export class BranchPlanDetailsModel {
  constructor(
    public _id: string,
    public planType: string,
    public activationDate: boolean,
    public expiryDate: string,
  ) {}
}
