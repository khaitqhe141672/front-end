export interface ManageRateResponse {
  message: string
  data: ManageRateData
}

export interface ManageRateData {
  listPostRate: ListPostRate[]
  sizePage: number
}

export class ListPostRate {
  postID: number
  title: string
  totalRate: number
  totalReportRate: number
  statusPost: number
}
