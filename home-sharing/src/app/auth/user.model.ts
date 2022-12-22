export class User{
  constructor(
    public id:number,
    public username:string,
    public role:string,
    private  _token:string,
    public status:number
  ) { }
  get token(){
    return this._token
  }


}
