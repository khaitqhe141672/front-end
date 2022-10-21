export interface ReponsePost {
  status: string
  object: Object
}

export class Post {
  postDetailID: number
  postID: number
  title: string
  price: number
  createDate: string
  hostName: string
  imageUrlHost: string
  address: string
  description: string
  guestNumber: number
  numberOfBathrooms: number
  numberOfBedrooms: number
  numberOfBeds: number
  serviceFee: number
  roomTypeName: string
  imageDtoList: ImageDtoList[]
  postUtilityDtoList: PostUtilityDtoList[]
  districtDto: DistrictDto
  status: number
}

export interface ImageDtoList {
  postImageID: number
  imageUrl: string
}

export interface PostUtilityDtoList {
  postUtilityID: number
  price: number
  utilityID: number
  status: number
}

export interface DistrictDto {
  districtName: string
  provinceName: string
}
