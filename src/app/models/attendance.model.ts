export class AttendanceModel {
  constructor(
    public _id: string,
    public date: string,
    public branch: string,
    public category: string,
    public course: string,
    public batch: string,
    public subject: string,
    public attendance: StudentAttendanceModel[],
  ) {}
}

export class StudentAttendanceModel {
  constructor(public _id: string, public student: string, public attendance: string) {}
}
