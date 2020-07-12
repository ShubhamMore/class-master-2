export class OnlineExamResultModel {
  constructor(
    public _id: string,
    public student: string,
    public onlineExam: string,
    public answeredQuestions: number,
    public unAnsweredQuestions: number,
    public correctAnswers: number,
    public wrongAnswers: number,
    public marks: number,
    public status: boolean,
  ) {}
}
