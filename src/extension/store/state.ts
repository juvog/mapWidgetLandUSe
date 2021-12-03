import { getDefaultDashboardState } from "dashboard/store/state"
import { EXTENSION_ID, JExtensionState, JExtMainState, REDUX_STATE_APP_REDUCER_ID } from "extension/model"
import { JAppState } from "jmap-app"
import { JCoreState } from "jmap-core"
import { extensionActionCreator } from "./actions"
import { getStore } from "./store"

export function getAppState(state?: JCoreState): JAppState {
  if (!state) {
    state = getStore().getState()
  }
  return state.external[REDUX_STATE_APP_REDUCER_ID]
}

export function getExtensionState(state?: JCoreState): JExtensionState {
  if (!state) {
    state = getStore().getState()
  }
  return state.external[EXTENSION_ID]
}

export function resetExtensionState(): void {
  getStore().dispatch(extensionActionCreator.resetState())
}

function getDefaultMainState(): JExtMainState {
  return {
    serverExtensionVersion: "unknown"
  }
}

export function getDefaultExtensionState(): JExtensionState {
  return {
    main: getDefaultMainState(),
    dashboard: getDefaultDashboardState()
  }
}
