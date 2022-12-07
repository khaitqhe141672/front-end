export interface AdminDashBoardRResponse {
  message: string
  data: AdminDashBoardData
}

export interface AdminDashBoardData {
  totalAccount: number
  totalCustomerDeActive: number
  post: PostChart[]
  totalCustomer: number
  totalHost: number
  totalHostDeActive: number
  totalPostPayment: number
  paymentDtoList: PaymentDtoList[]
  totalPost: number
}

export interface PostChart {
  name: string
  value: number
}

export interface PaymentDtoList {
  packagePaymentID: number
  totalPost: number
}
