export interface AdminDashBoardRResponse {
  message: string
  data: AdminDashBoardData
}

export interface AdminDashBoardData {
  totalPostDeActive: number
  totalAccount: number
  totalPost: number
  totalCustomerDeActive: number
  totalPostActive: number
  totalCustomer: number
  totalHost: number
  totalHostDeActive: number
  totalPostPayment: number
  paymentDtoList: PaymentDtoList[]
}

export class PaymentDtoList {
  packagePaymentID: number
  totalPost: number
}
