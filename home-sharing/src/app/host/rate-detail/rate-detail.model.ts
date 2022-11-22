export interface RateDetailResponse {
  message: string
  data: RateDetailResponseData
}

export interface RateDetailResponseData {
  listDetailRate: ListDetailRate
  sizePage: number
}

export interface ListDetailRate {
  postID: number
  title: string
  statusPost: number
  avgRate: number
  detailRateDtoList: DetailRateDtoList[]
}

export class DetailRateDtoList {
  customerID: number
  username: string
  fullName: string
  urlImage: string
  star: number
  totalLike: number
  totalDislike: number
  rateID: number
  comment: string
  dateRate: string
  statusRate: number
}
