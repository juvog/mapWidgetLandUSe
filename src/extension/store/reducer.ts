import { dashboardReducer } from "dashboard/store/reducer"
import { JExtensionState } from "extension/model"
import { Action, Reducer } from "redux"
import { ACTIONS, JExtSetServerExtensionVersion } from "./actions"
import { getDefaultExtensionState } from "./state"

export const extensionReducer: Reducer<JExtensionState, Action> = (
  state: JExtensionState | undefined,
  action: Action
): JExtensionState => {
  if (!state) {
    state = getDefaultExtensionState()
  }
  switch (action.type) {
    case ACTIONS.EXTENSION_RESET_STATE: {
      return getDefaultExtensionState()
    }

    case ACTIONS.EXTENSION_SET_SERVER_EXTENSION_VERSION: {
      const { serverExtensionVersion } = action as JExtSetServerExtensionVersion
      const newState: JExtensionState = {
        ...state,
        main: {
          ...state.main,
          serverExtensionVersion
        }
      }
      return newState
    }

    default: {
      const newState: JExtensionState = { ...state }
      newState.dashboard = dashboardReducer(state.dashboard, action)
      // add other reducers here
      return newState
    }
  }
}
