import { LectureQuestionAnswerModel } from './lecture-question-answers.model';
export class LectureQuestionModel {
  constructor(
    public _id: string,
    public branch: string,
    public category: string,
    public course: string,
    public batch: string,
    public lecture: string,
    public question: string,
    public createdBy: string,
    public createdAt: number,
    public editedAt: number,
    public status: boolean,
    public name?: string,
    public answers?: LectureQuestionAnswerModel[],
  ) {}
}
