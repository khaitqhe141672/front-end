export interface DetailReportResponse {
  message: string
  data: DetailReportData
}

export interface DetailReportData {
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
}
