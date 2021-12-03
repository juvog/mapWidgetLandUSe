import { getExtensionState } from "extension/store/state"
import { getStore } from "extension/store/store"
import { translate } from "extension/tools/language"
import { JExtDashboard, JExtDashboardAddParams, JExtDashboardService } from "./model"
import { dashboardRPO } from "./repository-extension"
import { dashboardActionCreator } from "./store/action"
import { validateDashboardId } from "./tools/common"

export const dashboardSVC: JExtDashboardService = {
  getAll(): JExtDashboard[] {
    return getExtensionState().dashboard.dashboards.slice()
  },
  getById(dashboardId: string): JExtDashboard {
    validateDashboardId(dashboardId)
    const dashboard: JExtDashboard | undefined = this.getAll().findByProperty("id", dashboardId)
    if (!dashboard) {
      throw Error(`Favourite id="${dashboardId}" not found`)
    }
    return dashboard
  },
  existById(dashboardId: string): boolean {
    validateDashboardId(dashboardId)
    return this.getAll().findByProperty("id", dashboardId) !== undefined
  },
  add(dashboard: JExtDashboardAddParams): Promise<JExtDashboard> {
    return new Promise<JExtDashboard>((resolve, reject) => {
      if (typeof dashboard !== "object") {
        return reject("Parameter dashboard must be an object")
      }
      if (!JMap.Layer.exists(dashboard.layerId)) {
        return reject(`Layer id="${dashboard.layerId}" not found`)
      }
      if (typeof dashboard.name !== "string" || !dashboard.name) {
        return reject("Dashboard name must be a non empty string")
      }
      const allDashboards: JExtDashboard[] = getExtensionState().dashboard.dashboards
      if (allDashboards.findIndexByProperty("name", dashboard.name) !== -1) {
        return reject(`A dashboard with name="${dashboard.name}" already exist`)
      }
      dashboardRPO
        .add(dashboard)
        .then(dashboardId => {
          const newDashboard: JExtDashboard = { id: dashboardId, ...dashboard }
          getStore().dispatch(dashboardActionCreator.add(newDashboard))
          JMap.Application.Message.info(translate("dashboard.add.success"))
          resolve(newDashboard)
        })
        .catch(error => {
          console.error(error)
          JMap.Application.Message.info(translate("dashboard.delete.error"))
          reject(translate("dashboard.add.error"))
        })
    })
  },
  deleteById(dashboardId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      validateDashboardId(dashboardId)
      dashboardRPO
        .deleteById(dashboardId)
        .then(() => {
          getStore().dispatch(dashboardActionCreator.delete(dashboardId))
          JMap.Application.Message.info(translate("dashboard.delete.success"))
          resolve()
        })
        .catch(error => {
          console.error(error)
          JMap.Application.Message.info(translate("dashboard.delete.error"))
          reject(translate("dashboard.delete.error", dashboardId))
        })
    })
  }
}
