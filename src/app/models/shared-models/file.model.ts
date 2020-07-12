export class FileModel {
  constructor(
    public _id: string,
    public fileName: string,
    public publicId: string,
    public secureUrl: string,
    public createdAt: string,
  ) {}
}
