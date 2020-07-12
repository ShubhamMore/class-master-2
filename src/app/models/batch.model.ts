export class BatchModel {
  constructor(
    public _id: string,
    public batchName: string,
    public branch: string,
    public category: string,
    public course: string,
    public rollNoPrefix: string,
    public rollNo: number,
    public description: string,
    public status: boolean,
  ) {}
}
