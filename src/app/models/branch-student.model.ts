export class BranchStudentModel {
  constructor(
    public _id: string,
    public student: string,
    public branch: string,
    public category: string,
    public admissionDate: string,
    public description: string,
    public status: boolean,
    public name?: string,
  ) {}
}
