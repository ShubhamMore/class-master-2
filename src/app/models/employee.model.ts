export class EmployeeModel {
  constructor(
    public _id: string,
    public name: string,
    public birthDate: string,
    public phone: string,
    public email: string,
    public address: string,
    public qualification: string,
    public classMasterId: string,
  ) {}
}
