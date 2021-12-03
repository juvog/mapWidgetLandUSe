export interface JRequestConfig {
  url: string,
  params?: { [key: string]: any } | string
}

export interface JAjaxService {
  get(config: JRequestConfig): Promise<any>
  post(config: JRequestConfig): Promise<any>
  put(config: JRequestConfig): Promise<any>
  del(config: JRequestConfig): Promise<any>
}

export interface JAjaxResponse {
  message: string
  status: number
  result: any[] | any
}
