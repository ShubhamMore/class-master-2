export class ExamModel {
  constructor(
    public _id: string,
    public examTitle: string,
    public outOfMarks: number,
    public passingMarks: number,
    public date: string,
    public time: string,
    public duration: string,
    public branch: string,
    public category: string,
    public course: string,
    public batch: string,
    public subject: string,
    public marks: MarksModel[],
    public status: boolean,
  ) {}
}

export class MarksModel {
  constructor(
    public _id: string,
    public student: string,
    public rollNumber: string,
    public marks: number,
  ) {}
}
