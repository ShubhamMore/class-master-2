export class EmployeeLeaveModel {
  constructor(
    public _id: string,
    public employee: string,
    public branch: string,
    public leaveType: string,
    public duration: string,
    public date: string,
    public startDate: string,
    public endDate: string,
    public hours: string,
    public reason: string,
    public monitoredBy: string,
    public monitoredDate: string,
    public comment: string,
    public status: string,
  ) {}
}
