export class ResponseService {
  status: string
  object: ServiceObj[]
}

export class ServiceObj {
  id?: number
  icon?: string
  name?: string
  price?:number
}
