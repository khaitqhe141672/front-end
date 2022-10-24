export interface UserInfoResponse {
  status: string
  object: UserInfo
}

export interface UserInfo {
  userID: number
  email: string
  username: string
  userDetailID: number
  urlImage: string
  dob: string
  fullName: string
  mobile: string
  address: string
  status: number
  role: string
}
