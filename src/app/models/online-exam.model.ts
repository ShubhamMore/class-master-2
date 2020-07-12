import { QuestionModel } from './online-exam-question.model';
export class OnlineExamModel {
  constructor(
    public _id: string,
    public title: string,
    public date: string,
    public time: string,
    public duration: string,
    public branch: string,
    public category: string,
    public course: string,
    public batch: string,
    public subject: string,
    public description: string,
    public totalMarks: number,
    public passingMarks: number,
    public eachQuestionMarks: number,
    public totalQuestions: number,
    public status: boolean,
  ) {}
}
