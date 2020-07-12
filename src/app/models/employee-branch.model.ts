export class EmployeeBranchModel {
  constructor(
    public _id: string,
    public employee: string,
    public branch: string,
    public description: string,
    public employeeBranchRole: string,
    public basicSalary: string,
    public status: boolean,
  ) {}
}
