
export class RecommendedPlaceResponse{
  static : string
  object: RecommendedPlace[]
}

export class RecommendedPlace {
  provinceID: number
  provinceName: string
  imageUrl: string
}
