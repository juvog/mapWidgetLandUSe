import { getAppExtension } from "extension/tools/start"
import "polyfill"

const extension: JAppExtension = getAppExtension()

const register = () => {
  if (typeof JMap !== "object" || typeof JMap.Application !== "object") {
    setTimeout(() => register(), 500)
    return
  }
  if (!JMap.Application.Extension.isRegistered(extension.id)) {
    JMap.Application.Extension.register(extension)
  }
}

register()

export default "ok"
