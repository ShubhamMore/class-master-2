export class ScheduleModel {
  constructor(
    public _id: string,
    public branch: string,
    public category: string,
    public course: string,
    public batch: string,
    public scheduleStartDate: string,
    public scheduleEndDate: string,
    public schedule: ScheduleDayModel[],
    public status: boolean,
  ) {}
}

export class ScheduleDayModel {
  constructor(
    public _id: string,
    public day: string,
    public date: string,
    public startTime: string,
    public duration: number,
    public type: string,
    public subject: string,
    public topic: string,
    public teacher: string,
    public status: boolean,
  ) {}
}
