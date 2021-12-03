import { Store, Action } from "redux"
import { JCoreState } from "jmap-core"

export function getStore(): Store<JCoreState, Action> {
  return JMap.getDataStore()
}
