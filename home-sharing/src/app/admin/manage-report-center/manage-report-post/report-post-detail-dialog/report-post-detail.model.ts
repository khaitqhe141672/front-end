export interface DetailReportResponse {
  message: string
  data: DetailReportData
}

export interface DetailReportData {
  detailReportPost: DetailReportPost[]
  size: number
  sizePage: number
}

export class DetailReportPost {
  reportID: number
  username: string
  imageUrl: string
  fullName:string
  description: string
  reportTypeID: number
  nameReportType: string
  status: number
}
