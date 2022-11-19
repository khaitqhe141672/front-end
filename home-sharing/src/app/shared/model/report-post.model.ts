export class IResponseReportPost {
  message: string
  data: Data
}

export class Data {
  SizePage: number
  listReportPost: ListReportPost
}

export class ListReportPost {
  content: content[]
}

export class content {
  id: number
  reportType: ReportType
  customer: Customer
  post: Post
  description: string
  status: number
}

export class ReportType {
  id: number
  name: string
  status: number
}

export class Customer {
  id: number
  user: User
}

export class User {
  id: number
  username: string
  email: string
  userDetail: UserDetail
  codeActive: string
  createDate: string
  status: number
}

export class UserDetail {
  userDetailId: number
  fullName: string
  mobile: string
  address: string
  avatarUrl: string
  dob: string
}

export class Post {
  id: number
  title: string
  price: number
  createDate: string
  status: number
}
