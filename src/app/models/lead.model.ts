export class LeadModel {
  constructor(
    public _id: string,
    public leadName: string,
    public leadContact: string,
    public leadEmail: string,
    public branch: string,
    public category: string,
    public course: string,
    public address: string,
    public date: string,
    public followUpDate: string,
    public status: boolean,
    public strength: string,
    public mode: string,
    public source: string,
    public comment: string,
  ) {}
}
