export interface ResponseHistory {
  status: string
  object: HistoryDetail[]
}

export class HistoryDetail {
  bookingID: number
  bookingDetailID:number
  postID: number
  imagePost: string
  nameHost: string
  avatarHost: string
  startDate: string
  endDate: string
  totalPerson: number
  totalMoney: number
  statusBooking: number
  statusRate: number
  titlePost:number
}
