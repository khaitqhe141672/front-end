export interface ResponsePostDetail {
  status: string
  object: Object
}

export class PostDetail {
  postDetailID: number
  postID: number
  title: string
  price: number
  createDate: string
  hostName: string
  mobileHost: string
  imageUrlHost: string
  address: string
  description: string
  guestNumber: number
  numberOfBathrooms: number
  numberOfBedrooms: number
  numberOfBeds: number
  serviceDtoList: ServiceDetailDtoList[]
  roomTypeName: string
  imageDtoList: ImageDetailDtoList[]
  postUtilityDtoList: PostUtilityDetailDtoList[]
  districtDto: DistrictDetailDto
  postVoucherDtoList: PostVoucherDetailDtoList[]
  avgRate?:number
  status: number
  latitude: string
  longitude: string
  bookingDate?: string[]
  typeAccountHost: number
  countBooking?:number
}

export class ServiceDetailDtoList {
  postServiceID: number
  iconService: string
  nameService: string
  price: number
  serviceID: number
  status: number
}

export class ImageDetailDtoList {
  postImageID: number
  imageUrl: string
}

export class PostUtilityDetailDtoList {
  postUtilityID: number
  iconUtility: string
  nameUtility: string
  utilityID: number
  status: number
}

export class DistrictDetailDto {
  districtName: string
  provinceName: string
}

export class PostVoucherDetailDtoList {
  postVoucherID: number
  code:string
  voucherID: number
  description: string
  dueDay: number
  nameVoucher: string
  percent: number
  startDate: string
  endDate: string
  status: number
}
