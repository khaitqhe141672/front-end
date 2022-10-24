export class User{
  constructor(
    public id:number,
    public username:string,
    public role:string,
    private  _token:string
  ) { }
  get token(){
    return this._token
  }


}
