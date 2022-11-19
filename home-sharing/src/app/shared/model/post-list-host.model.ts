export interface IResponsePost {
  message: string
  data: ListPostData
}

export interface ListPostData {
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
