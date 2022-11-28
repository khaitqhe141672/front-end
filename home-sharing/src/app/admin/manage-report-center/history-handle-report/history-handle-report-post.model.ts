export interface HistoryHandlePostResponse {
  message: string
  data: HistoryHandlePostData
}

export interface HistoryHandlePostData {
  listHistoryReportPost: ListHistoryReportPost[]
  size: number
  sizePage: number
}

export interface ListHistoryReportPost {
  postID: number
  title: string
  historyHandleReportPostID: number
  statusPost: number
  statusReportPost: number
  totalReportPost: number
}
