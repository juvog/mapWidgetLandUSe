import { DASHBOARD_TYPES, JExtDashboard } from "dashboard/model"
import { dashboardRPO } from "dashboard/repository-extension"
import { dashboardSVC } from "dashboard/service-extension"
import { dashboardActionCreator } from "dashboard/store/action"
import { getStore } from "extension/store/store"

export function fetchDashboards(): Promise<JExtDashboard[]> {
  return new Promise<JExtDashboard[]>((resolve, reject) => {
    getStore().dispatch(dashboardActionCreator.setLoading(true))
    getStore().dispatch(dashboardActionCreator.setHasLoadingError(false))
    dashboardRPO
      .getAll()
      .then(dashboards => {
        getStore().dispatch(dashboardActionCreator.setLoading(false))
        getStore().dispatch(dashboardActionCreator.setAll(dashboards))
        dashboardSVC.add({ name: "my-dashboard", layerId: 6, type: DASHBOARD_TYPES.CHART })
        resolve(dashboards)
      })
      .catch(error => {
        console.error(error)
        getStore().dispatch(dashboardActionCreator.setLoading(false))
        getStore().dispatch(dashboardActionCreator.setHasLoadingError(true))
        getStore().dispatch(dashboardActionCreator.setAll([]))
        reject("Cannot get dashboards from server")
      })
  })
}
