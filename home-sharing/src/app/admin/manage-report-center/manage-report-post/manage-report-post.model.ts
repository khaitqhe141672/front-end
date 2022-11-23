export interface ReportPostResponse {
  message: string
  data: ReportPostData
}

export interface ReportPostData {
  sizePage: number
  reportPostList: ReportPostDetail[]
}

export class ReportPostDetail {
  postID: number
  title: string
  price: number
  username: string
  imageUserUrl: string
  typeAccount: number
  totalReport: number
  statusPost: number
  statusReportPost: number
  imagePostUrl?: string
}
