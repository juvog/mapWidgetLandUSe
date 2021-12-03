export interface VictoryDiagramType {
  x: string
  y: number
}

import { JExtDashboardService, JExtDashboardState } from "dashboard/model"

export const EXTENSION_ID: string = "Dashboard"
export const EXTENSION_TITLE_TRANSLATION_KEY: string = "bi.dashboard.title"
export const EXTENSION_ICON_TOOLTIP_TRANSLATION_KEY: string = "bi.dashboard.icon.tooltip"
export const EXTENSION_PANEL_ID: string = `${EXTENSION_ID}-panel`
export const REDUX_STATE_APP_REDUCER_ID: string = "jmap_app"
export type JExtensionLoadedListener = () => void

export type JTranslateFn = (key: string, params?: string | string[] | number | number[], paramLocale?: string) => string

export interface JEXTObjectId {
  id: string
}

export interface JExtMainState {
  serverExtensionVersion: string
}

export interface JExtensionState {
  main: JExtMainState
  dashboard: JExtDashboardState
}

export interface JExtensionMainService {
  getJSVersion(): string
  getServerExtensionVersion(): string
}

export interface JExtensionService extends JExtensionMainService {
  Dashboard: JExtDashboardService
}
