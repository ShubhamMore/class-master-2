export class User {
  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public phone: string,
    public userRole: string,
    public classMasterId: string,
    private _token: string,
    private _tokenExpirationDate: Date,
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
