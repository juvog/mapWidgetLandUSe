import { dashboardSVC } from "dashboard/service-extension"
import { JExtensionMainService, JExtensionService } from "./model"
import { getExtensionState } from "./store/state"

export const extentionMainSVC: JExtensionMainService = {
  getJSVersion(): string {
    return EXTENSION_VERSION
  },
  getServerExtensionVersion(): string {
    return getExtensionState().main.serverExtensionVersion
  }
}

export const extentionSVC: JExtensionService = {
  ...extentionMainSVC,
  Dashboard: dashboardSVC
}
