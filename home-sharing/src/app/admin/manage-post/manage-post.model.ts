export interface ManagePostResponse {
  message: string
  data: ListPost
}

export interface ListPost {
  "List-Post": PostTableDetail[]
  SizePage: number
}

export class PostTableDetail {
  postID: number
  title: string
  statusPost: number
  statusPostPayment: number
  startDate?: string
  endDate?: string
}
