export interface SearchFilterResponse {
  message: string
  data: SearchFilterData
}

export interface SearchFilterData {
  searchList: SearchList[]
}

export interface SearchList {
  postID: number
  title: string
  address: string
  price: number
  imageUrl: string
  nameVoucher: string
  avgStar: number
  typeAccount: number
  fullName: string
  provinceID: number
  numberOfGuest: number
  typeRoomID: number
  serviceDtoList: ServiceDtoList[]
  utilityDtoList: UtilityDtoList[]
  postVoucherDtoList: PostVoucherDtoList[]
}

export interface ServiceDtoList {
  postServiceID: number
  nameService: string
  price: number
  serviceID: number
  status: number
}

export interface UtilityDtoList {
  postUtilityID: number
  nameUtility: string
  utilityID: number
  status: number
}

export interface PostVoucherDtoList {
  postVoucherID: number
  voucherID: number
  dueDay: number
  percent: number
  status: number
}
