import { JExtDashboardState } from "dashboard/model"

export function getDefaultDashboardState(): JExtDashboardState {
  return {
    dashboards: [],
    isLoading: false,
    hasLoadingError: false
  }
}
