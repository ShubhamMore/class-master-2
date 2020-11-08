export class AssignmentSubmissionModel {
  constructor(
    public _id: string,
    public assignment: string,
    public student: string,
    public title: string,
    public description: string,
    public grades: string,
    public remark: string,
    public fileName: string,
    public fileSize: string,
    public fileType: string,
    public secureUrl: string,
    public publicId: string,
    public createdAt: string,
    public status: boolean,
    public studentName?: string,
  ) {}
}
