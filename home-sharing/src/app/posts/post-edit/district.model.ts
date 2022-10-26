export interface ResponseDistrictByProvince {
  status: string
  object: DistrictByProvince[]
}

export interface DistrictByProvince {
  id: number
  province: Province
  name: string
}

export interface Province {
  id: number
  name: string
}
