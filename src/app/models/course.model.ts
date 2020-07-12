export class CourseModel {
  constructor(
    public _id: string,
    public courseName: string,
    public branch: string,
    public category: string,
    public description: string,
    public subjects: SubjectModel[],
    public fees: string,
    public gst: string,
    public inclusiveGST: string,
    public totalFees: string,
    public status: boolean,
  ) {}
}

export class SubjectModel {
  constructor(public _id: string, public subject: string, public status: boolean) {}
}
