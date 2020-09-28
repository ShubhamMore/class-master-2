export class LectureMaterialModel {
  constructor(
    public _id: string,
    public branch: string,
    public category: string,
    public course: string,
    public batch: string,
    public lecture: string,
    public title: string,
    public fileName: string,
    public fileType: string,
    public secureUrl: string,
    public publicId: string,
    public createdAt: string,
    public status: boolean,
  ) {}
}
