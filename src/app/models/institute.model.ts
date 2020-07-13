export class InstituteModel {
  constructor(
    public _id: string,
    public name: string,
    public phone: string,
    public email: string,
    public address: string,
    public imsMasterId: string,
    public status: boolean,
  ) {}
}
