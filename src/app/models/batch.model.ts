export class BatchModel {
  constructor(
    public _id: string,
    public branch: string,
    public category: string,
    public course: string,
    public basicDetails: BatchBasicDetailsModel,
    public subjects: BatchSubjectModel[],
    public status: boolean,
  ) {}
}

export class BatchBasicDetailsModel {
  constructor(
    public batchName: string,
    public rollNoPrefix: string,
    public startDate: string,
    public rollNo: number,
    public description: string,
    public subjects: BatchSubjectModel[],
  ) {}
}

export class BatchSubjectModel {
  constructor(
    public _id: string,
    public subject: string,
    public teacher: string,
    public status: boolean,
  ) {}
}
