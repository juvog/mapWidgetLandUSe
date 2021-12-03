import { JExtDashboard, JExtDashboardAddParams, JExtDashboardRepository } from "./model"

// A repository is responsible of persisting the data on the server

// for example purpose, where we don't persist on the server
let nextId: number = 0

export const dashboardRPO: JExtDashboardRepository = {
  getAll(): Promise<JExtDashboard[]> {
    return new Promise<JExtDashboard[]>((resolve, reject) => {
      const token: string = JMap.User.getToken()
      if (token === "-1") {
        return reject("user.no.token")
      }
      setTimeout(() => {
        resolve([])
      }, 3000)
    })
  },
  add(dashboard: JExtDashboardAddParams): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const token: string = JMap.User.getToken()
      if (token === "-1") {
        return reject("user.no.token")
      }
      setTimeout(() => resolve(String(nextId++)), 200)
    })
  },
  deleteById(dashboardId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const token: string = JMap.User.getToken()
      if (token === "-1") {
        return reject("user.no.token")
      }
      setTimeout(() => resolve(), 200)
    })
  }
}
