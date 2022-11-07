export interface ResponseFollow {
  message: string
  data: FollowData
}

export interface FollowData {
  customerFollow: number
  FollowerHostID: number
  status: number
}
