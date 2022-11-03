export interface VoucherResponse {
  message: string
  data: ListVoucher
}

export interface ListVoucher {
  vouchers: Voucher[]
}

export class Voucher {
  idVoucher:number
  nameVoucher: string
  description: string
  percent: number
  dueDate: number
  status: number
}
