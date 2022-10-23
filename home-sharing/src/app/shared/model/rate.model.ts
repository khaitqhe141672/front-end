export class RateResponse {
  status: string
  object: Rate[]
}

export class Rate {
  rateID: number
  postID: number
  customerID: number
  username: string
  comment: string
  point: number
  dateRate: string
  status: number
}
