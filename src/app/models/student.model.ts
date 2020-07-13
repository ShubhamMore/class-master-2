export class StudentModel {
  constructor(
    public _id: string,
    public name: string,
    public birthDate: string,
    public phone: string,
    public email: string,
    public address: string,
    public parentName: string,
    public parentEmail: string,
    public parentPhone: string,
    public imsMasterId: string,
    public status: boolean,
  ) {}
}
