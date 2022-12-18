export interface HostDashBoardResponse {
  message: string
  data: HostDashBoardData
}

export interface HostDashBoardData {
  totalPost: number
  post: PostDB[]
  totalPriceByPost: TotalPriceByPost[]
  totalBooking: TotalBooking[]
  totalPostByMonth: TotalPostByMonth[]
  totalPostPayment: TotalPostPayment[]
}

export interface TotalPostPayment {
  packagePaymentID: number
  totalPost: number
}

export class PostDB {
  name: string
  value: number
}

export class TotalPriceByPost {
  title: number
  price: number
}

export class TotalBooking {
  title: number
  totalBooking: number
}

export class TotalPostByMonth {
  month: number
  totalPost: number
}

export class TotalPostPayment {
  packagePaymentID: number
  totalPost: number
}
