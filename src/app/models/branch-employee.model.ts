export class BranchEmployeeModel {
  constructor(
    public _id: string,
    public employee: string,
    public branch: string,
    public description: string,
    public role: string,
    public basicSalary: string,
    public status: boolean,
  ) {}
}

export class EmployeeNameIdModel {
  constructor(
    public _id: string,
    public branch: string,
    public employee: string,
    public name: string,
    public role: string,
  ) {}
}
