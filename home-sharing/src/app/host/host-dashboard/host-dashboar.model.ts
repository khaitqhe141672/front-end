export interface HostDashBoardResponse {
  message: string
  data: HostDashBoardData
}

export interface HostDashBoardData {
  totalPostDeActive: number
  totalPost: number
  totalPostActive: number
  totalBooking: any[]
  totalPostPayment: TotalPostPayment[]
}

export interface TotalPostPayment {
  packagePaymentID: number
  totalPost: number
}
