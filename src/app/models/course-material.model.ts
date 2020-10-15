export class CourseMaterialModel {
  constructor(
    public _id: string,
    public branch: string,
    public category: string,
    public course: string,
    public subject: string,
    public title: string,
    public fileName: string,
    public fileSize: number,
    public fileType: string,
    public secureUrl: string,
    public publicId: string,
    public createdAt: string,
    public status: boolean,
  ) {}
}
