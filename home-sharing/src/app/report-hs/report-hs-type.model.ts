export interface RateTypeResponse {
  status: string
  object: RateTypeData[]
}

export class RateTypeData {
  id: number
  name: string
  status: number
}
