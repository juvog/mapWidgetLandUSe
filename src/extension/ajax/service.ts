import axios, { AxiosRequestConfig } from "axios"
import { JRequestConfig, JAjaxService } from "./model"

function logoutIfTokenInvalid(error: any): void {
  if (error?.response?.status === 401 && error?.response?.data?.message === "Invalid session id.") {
    JMap.User.logout()
  }
}

function getAxiosRequestConfig(config: JRequestConfig): AxiosRequestConfig {
  const axiosConfig: AxiosRequestConfig = {}
  axiosConfig.headers = {}
  const token: string = JMap.User.getToken()
  if (token !== "-1") {
    axiosConfig.headers["x-auth-token"] = token
  }
  return axiosConfig
}

export const ajaxSVC: JAjaxService = {
  get(config: JRequestConfig): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(config.url, getAxiosRequestConfig(config))
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error: any) => {
          logoutIfTokenInvalid(error)
          reject(error)
        })
    })
  },
  post(config: JRequestConfig): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .post(config.url, config.params, getAxiosRequestConfig(config))
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error: any) => {
          logoutIfTokenInvalid(error)
          reject(error)
        })
    })
  },
  put(config: JRequestConfig): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .put(config.url, config.params, getAxiosRequestConfig(config))
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error: any) => {
          logoutIfTokenInvalid(error)
          reject(error)
        })
    })
  },
  del(config: JRequestConfig): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(config.url, getAxiosRequestConfig(config))
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error: any) => {
          logoutIfTokenInvalid(error)
          reject(error)
        })
    })
  }
}
