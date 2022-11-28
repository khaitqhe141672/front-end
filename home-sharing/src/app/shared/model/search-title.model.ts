export interface SearchTitleResponse {
  message: string
  data: SearchTitleData
}

export interface SearchTitleData {
  searchList: SearchListByTitle[]
  sizePage: number
}

export interface SearchListByTitle {
  postID: number
  title: string
  address: string
  price: number
  imageUrl: string
  nameVoucher?: string
  avgStar?: number
  typeAccount: number
  numberOfGuest: number
}
