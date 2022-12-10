export interface IResponseAccount {
  message: string
  data: ListAccountHost
}

export interface ListAccountHost {
  SizePage: number
  HostList: AccountHost[]
}

export class AccountHost {
  hostID: number
  userID?:number
  userDetailID?:number
  username: string
  email: string
  urlImage: string
  roleName: string
  dob: string
  fullName: string
  mobile: string
  address: string
  totalFollower: number
  status: number
  typeAccountHost:number
}
