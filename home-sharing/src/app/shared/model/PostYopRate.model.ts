export class ResponsePostTopRate{
  static : string
  object: PostTopRate[]
}

export class PostTopRate{
  postID: number
  urlImage: string
  title: string
  star: number
  price: number
  address: string
}
