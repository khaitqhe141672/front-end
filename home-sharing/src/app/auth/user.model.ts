export class User{
  constructor(
    id:string,
    username:string,
    password:string,
    role:string,
    private  _token:string
  ) { }
  get token(){
    return this._token
  }
}
