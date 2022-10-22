export class District{
  id: number
  province: Province
  name: string
}
export class ResponseDistrict {
  status: string
  object: District[]
}
export class ResponseProvince{
  status: string
  object: Province[]
}
export class Province {
  id: number
  name: string
  imageUrl: string
}
