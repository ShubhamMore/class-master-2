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
    public description: string,
    public generatedBy: string,
    public fileName: string,
    public fileSize: string,
    public fileType: string,
    public secureUrl: string,
    public publicId: string,
    public status: boolean,
    public generatedByName?: string,
    public submission?: any,
  ) {}
}
