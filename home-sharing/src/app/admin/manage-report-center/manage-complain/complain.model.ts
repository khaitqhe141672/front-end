export interface ListComplainResponse {
  message: string
  data: ListComplainData
}

export interface ListComplainData {
  size: number
  listComplaint: ListComplaint[]
  sizePage: number
}

export interface ListComplaint {
  postID: number
  title: string
  complaintPostID: number
  descriptionComplaint: string
  fullName: string
  username: string
  imageUrl: string
  statusComplaint: number
  statusPost:number
}
