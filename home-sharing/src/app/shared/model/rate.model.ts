export interface RateResponse {
  message: string
  data: RateResponseData
}
export class RateResponseData {
  sizePage: number
  listRate: Rate[]
}

export class Rate {
  rateID: number
  postID: number
  customerID: number
  username: string
  urlImage: string
  comment: string
  point: number
  dateRate: string
  countLike: number
  countDislike: number
  status: number
}
