export class AssignmentModel {
  constructor(
    public _id: string,
    public branch: string,
    public category: string,
    public course: string,
    public batch: string,
    public subject: string,
    public topic: string,
    public date: string,
    public submissionDate: string,
    public totalGrades: string,
    public generatedBy: string,
    public status: boolean,
  ) {}
}
