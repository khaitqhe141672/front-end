export interface ResponseRoom {
  message: string
  data: Data
}

export interface Data {
  roomTypes: RoomType[]
}

export interface RoomType {
  id: number
  name: string
}
