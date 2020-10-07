export class NotificationModel {
  constructor(
    public _id: string,
    public title: string,
    public message: string,
    public date: any,
    public status: boolean,
  ) {}
}
