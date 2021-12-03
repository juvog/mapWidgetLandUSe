import { JExtDashboard, JExtDashboardState } from "dashboard/model"
import { ACTIONS } from "extension/store/actions"
import { Action, Reducer } from "redux"
import {
  JExtDashboardAdd,
  JExtDashboardDelete,
  JExtDashboardHasLoadingError,
  JExtDashboardSetAll,
  JExtDashboardSetIsLoading
} from "./action"
import { getDefaultDashboardState } from "./state"

const sortDashboardByName = (d1: JExtDashboard, d2: JExtDashboard): number => {
  if (d1.name < d2.name) {
    return -1
  } else if (d1.name > d2.name) {
    return 1
  } else {
    return 0
  }
}

export const dashboardReducer: Reducer<JExtDashboardState, Action> = (
  state: JExtDashboardState | undefined,
  action: Action
): JExtDashboardState => {
  if (!state) {
    state = getDefaultDashboardState()
  }
  switch (action.type) {
    case ACTIONS.EXTENSION_SET_DASHBOARD_IS_LOADING: {
      const { isLoading } = action as JExtDashboardSetIsLoading
      return {
        ...state,
        isLoading
      }
    }

    case ACTIONS.EXTENSION_SET_DASHBOARD_HAS_LOADING_ERROR: {
      const { hasLoadingError } = action as JExtDashboardHasLoadingError
      return {
        ...state,
        hasLoadingError
      }
    }

    case ACTIONS.EXTENSION_SET_ALL_DASHBOARD: {
      const { dashboards } = action as JExtDashboardSetAll
      dashboards.sort(sortDashboardByName)
      return {
        ...state,
        dashboards
      }
    }

    case ACTIONS.EXTENSION_ADD_DASHBOARD: {
      const { dashboard } = action as JExtDashboardAdd
      const dashboards: JExtDashboard[] = state.dashboards.slice()
      const index = dashboards.findIndexByProperty("id", dashboard.id)
      if (index === -1) {
        dashboards.push(dashboard)
      } else {
        dashboards.splice(index, 1, dashboard) // replace existing
      }
      return {
        ...state,
        dashboards
      }
    }

    case ACTIONS.EXTENSION_DELETE_DASHBOARD: {
      const { dashboardId } = action as JExtDashboardDelete
      return {
        ...state,
        dashboards: state.dashboards.filter(p => p.id !== dashboardId)
      }
    }

    default:
      return state
  }
}
