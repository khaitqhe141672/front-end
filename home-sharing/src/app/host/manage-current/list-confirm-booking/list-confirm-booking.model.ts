export interface ListConfirmBookingResponse {
  message: string
  data: ListConfirmBookingData
}

export interface ListConfirmBookingData {
  sizePage: number
  listBooking: ListBooking[]
}

export class ListBooking {
  viewBookingDto: ViewBookingDto
  userBookingDto: UserBookingDto
  bookingServiceDtos?: BookingServiceDto[]
  bookingPostVoucherDto?: BookingPostVoucherDto
}

export class ViewBookingDto {
  bookingID: number
  bookingDetailID: number
  postID: number
  title: string
  startDate: string
  endDate: string
  totalMoney: number
  totalPerson: number
  totalService: number
  note: string
  status: number
}
export class UserBookingDto {
  userID: number
  customerID: number
  username: string
  fullName: string
  urlImage: string
}

export class BookingServiceDto {
  bookingID: number
  postServiceID: number
  priceService: number
  iconService: string
  nameService: string
}
export class BookingPostVoucherDto {
  postVoucherID: number
  voucherID: number
  code: string
  percent: number
  status: number
}

