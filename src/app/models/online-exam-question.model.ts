export class QuestionModel {
  constructor(
    public _id: string,
    public onlineExam: string,
    public question: string,
    public answers: AnswerModel[],
    public marks: number,
    public status: boolean,
  ) {}
}

export class AnswerModel {
  constructor(public _id: string, public answer: string, public isCorrect: boolean) {}
}
