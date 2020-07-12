export class ExamModel {
  constructor(
    public _id: string,
    public examTitle: string,
    public outOfMarks: string,
    public passingMarks: string,
    public date: string,
    public branch: string,
    public category: string,
    public course: string,
    public batch: string,
    public subject: string,
    public marks: MarksModel[],
  ) {}
}

export class MarksModel {
  constructor(public _id: string, public student: string, public marks: number) {}
}
