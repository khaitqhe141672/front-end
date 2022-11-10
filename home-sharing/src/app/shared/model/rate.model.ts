export class RateResponse {
  status: string
  object: Rate[]
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
