export interface ResponseHistory {
  message: string
  data: HistoryData
}

export interface HistoryData {
  sizePage: number
  historyBooking: HistoryBooking[]
}

export interface HistoryBooking {
  bookingID: number
  bookingDetailID: number
  postID: number
  titlePost: string
  imagePost: string
  nameHost: string
  avatarHost: string
  startDate: string
  endDate: string
  totalPerson: number
  totalMoney: number
  statusBooking: number
  statusRate: number
  statusReportPost: number
  viewRateCustomerDto?: ViewRateCustomerDto
  listReportPostCustomer?: ReportPostCustomer[]
}

export interface ViewRateCustomerDto {
  rateID: number
  comment: string
  point: number
  dateRate: string
  status: number
}
export class ReportPostCustomer {
  reportID: number
  description: string
  reportTypeID: number
  nameReportType: string
  status: number
}

