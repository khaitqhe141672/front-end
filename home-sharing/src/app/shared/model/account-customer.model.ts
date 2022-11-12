export interface ICustomersResponse {
  message: string
  data: CustomersData
}

export interface CustomersData {
  SizePage: number
  CustomerList: CustomerDetail[]
}

export class CustomerDetail {
  customerID: number
  userID: number
  email: string
  username: string
  userDetailID: number
  urlImage: string
  dob: string
  fullName: string
  mobile: string
  address: string
  status: number
  role: string
  typeAccount: number
}
