export class User{
  constructor(
    id:number,
    username:string,
    role:string,
    private  _token:string
  ) { }
  get token(){
    return this._token
  }
}
