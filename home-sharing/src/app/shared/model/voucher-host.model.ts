export interface IResponseVoucher {
  message: string
  data: ListVoucherData
}

export interface ListVoucherData {
  listVoucher: VoucherDetail[]
  sizePage: number
}

export class VoucherDetail {
  idVoucher: number
  nameVoucher: string
  description: string
  percent: number
  dueDate: number
  status: number
}
