export class CourseModel {
  constructor(
    public _id: string,
    public branch: string,
    public basicDetails: CourseBasicDetailsModel,
    public subjects: SubjectModel[],
    public feeDetails: CourseFeeDetailsModel,
    public status: boolean,
  ) {}
}

export class CourseBasicDetailsModel {
  constructor(
    public courseName: string,
    public category: string,
    public duration: number,
    public description: string,
  ) {}
}

export class CourseFeeDetailsModel {
  constructor(
    public fees: string,
    public gst: string,
    public inclusiveGST: boolean,
    public totalFees: string,
  ) {}
}

export class SubjectModel {
  constructor(public _id: string, public subject: string, public status: boolean) {}
}
