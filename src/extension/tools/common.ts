import { EXTENSION_ID, JEXTObjectId } from "extension/model"
import { translate } from "extension/tools/language"

export function getUniqueValues<T>(array: T[]): T[] {
  if (!array) {
    return []
  }
  return array.filter((element, index) => array.indexOf(element) === index)
}

export function createHelpMenu(): void {
  const options: JCoreOptions | undefined = window.JMAP_OPTIONS
  let helpUrl: string = "https://www.qwant.com/?q=k2%20geospatial"
  if (options?.extension_help_link) {
    if (!options.extension_help_link.startsWith("http")) {
      console.warn(`Extension help url must start with "http" : "${options.extension_help_link}"`)
    } else {
      helpUrl = options.extension_help_link
    }
  }
  JMap.Application.User.addPopupMenuAction(
    {
      id: getActionMenuId(),
      icon: "fas fa-info-circle",
      label: translate("bi.dashboard.help.menu.label"),
      isHelp: true,
      onClick: () => window.open(helpUrl, "_blank")
    },
    1
  )
}

export function deleteHelpMenu(): void {
  if (JMap.Application.User.existsPopupMenuActionById(getActionMenuId())) {
    JMap.Application.User.removePopupMenuActionById(getActionMenuId())
  }
}

export function removeDuplicateObjectsById<T extends JEXTObjectId>(array: T[]): T[] {
  if (!array) {
    return array
  }
  return array.filter((item, index) => array.findIndexByProperty("id", item.id) === index)
}

function getActionMenuId(): string {
  return `${EXTENSION_ID}-user-documentation`
}
