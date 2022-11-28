export interface DetailHistoryReportResponse {
  message: string
  data: DetailHistoryReportResponse
}

export interface DetailHistoryReportResponse {
  listDetailHistoryReportPost: ListDetailHistoryReportPost[]
  size: number
  sizePage: number
}

export interface ListDetailHistoryReportPost {
  reportPostID: number
  statusHistory: number
  description: string
  reportTypeName: string
  reportTypeID: number
  username: string
  fullName: string
  imageUrl:string
}
