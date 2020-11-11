export class OnlineExamQuestionModel {
  constructor(
    public _id: string,
    public onlineExam: string,
    public question: string,
    public answers: OnlineExamAnswerModel[],
    public marks: number,
    public status: boolean,
  ) {}
}

export class OnlineExamAnswerModel {
  constructor(public _id: string, public answer: string, public isCorrect: boolean) {}
}
