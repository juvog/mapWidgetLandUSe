import { JExtDashboard } from "dashboard/model"
import { ACTIONS } from "extension/store/actions"
import { Action } from "redux"

export interface JExtDashboardSetAll extends Action {
  dashboards: JExtDashboard[]
}

export interface JExtDashboardAdd extends Action {
  dashboard: JExtDashboard
}

export interface JExtDashboardDelete extends Action {
  dashboardId: string
}

export interface JExtDashboardSetIsLoading extends Action {
  isLoading: boolean
}

export interface JExtDashboardHasLoadingError extends Action {
  hasLoadingError: boolean
}

export const dashboardActionCreator = {
  setAll(dashboards: JExtDashboard[]): JExtDashboardSetAll {
    return {
      type: ACTIONS.EXTENSION_SET_ALL_DASHBOARD,
      dashboards
    }
  },
  add(dashboard: JExtDashboard): JExtDashboardAdd {
    return {
      type: ACTIONS.EXTENSION_ADD_DASHBOARD,
      dashboard
    }
  },
  delete(dashboardId: string): JExtDashboardDelete {
    return {
      type: ACTIONS.EXTENSION_DELETE_DASHBOARD,
      dashboardId
    }
  },
  setLoading(isLoading: boolean): JExtDashboardSetIsLoading {
    return {
      type: ACTIONS.EXTENSION_SET_DASHBOARD_IS_LOADING,
      isLoading
    }
  },
  setHasLoadingError(hasLoadingError: boolean): JExtDashboardHasLoadingError {
    return {
      type: ACTIONS.EXTENSION_SET_DASHBOARD_HAS_LOADING_ERROR,
      hasLoadingError
    }
  }
}
