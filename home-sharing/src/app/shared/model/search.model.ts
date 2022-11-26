export interface SearchResponse {
  message: string
  data: SearchData
}

export interface SearchData {
  listProvince: ListProvinceSearched[]
  listPost: ListPostSearched[]
}

export interface ListProvinceSearched {
  id: number
  name: string
  imageUrl: string
}

export interface ListPostSearched {
  postID: number
  title: string
  urlImage?: string
  price: number
  province?: string
}
