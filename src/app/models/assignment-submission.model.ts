export class AssignmentSubmissionModel {
  constructor(
    public _id: string,
    public assignment: string,
    public student: string,
    public title: string,
    public grades: string,
    public fileName: string,
    public fileSize: string,
    public fileType: string,
    public secureUrl: string,
    public publicId: string,
    public createdAt: string,
    public status: boolean,
  ) {}
}
