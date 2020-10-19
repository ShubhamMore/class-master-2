export class MembershipPlanModel {
  constructor(
    public _id: string,
    public name: string,
    public duration: string,
    public price: string,
    public status: boolean,
  ) {}
}
