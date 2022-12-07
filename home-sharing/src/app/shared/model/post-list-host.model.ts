export interface IResponsePost {
  message: string
  data: ListPostData
}

export interface ListPostData {
  SizePage:number
  listPost: PostDetail[]
}

export class PostDetail {
  postID: number
  title: string
  status: number
  endDate: string
  startDate: string
  avgRate: number
  statusPostPayment: number
}
