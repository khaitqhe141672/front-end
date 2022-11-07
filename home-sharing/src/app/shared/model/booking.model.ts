export class BookingBody {
  startDate: string
  endDate: string
  note?: string
  totalMoney: number
  totalPerson: number
  postServices: number[]
  postVoucherID?: number
  totalPriceRoom: number
  totalPriceService: number
  discount?: number
  fullName: string
  mobile: string
  email: string
}
