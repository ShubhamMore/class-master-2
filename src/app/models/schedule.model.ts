export class ScheduleModel {
  constructor(
    public _id: string,
    public branch: string,
    public category: string,
    public course: string,
    public batch: string,
    public subject: string,
    public date: string,
    public startTime: string,
    public endTime: string,
    public topic: string,
    public teacher: string,
    public sessionType: string,
    public status: boolean,
  ) {}
}
