export interface VoucherResponse {
  message: string
  object: Voucher[]
}

export interface ListVoucher {
  vouchers: Voucher[]
}

export class Voucher {
  idVoucher:number
  nameVoucher?: string
  description: string
  percent: number
  dueDate: number
  status: number
}

export interface VoucherPostResponse {
  status: string
  object: VoucherPost[]
}

export class VoucherPost {
  postVoucherID: number
  voucherID: number
  description: string
  dueDay: number
  nameVoucher: string
  percent: number
  startDate: string
  endDate: string
  status: number
}

