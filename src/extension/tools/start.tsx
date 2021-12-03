import { dashboardSVC } from "dashboard/service-extension"
import { Extension } from "extension/components/Extension"
import {
  EXTENSION_ICON_TOOLTIP_TRANSLATION_KEY,
  EXTENSION_ID,
  EXTENSION_TITLE_TRANSLATION_KEY,
  JExtensionLoadedListener
} from "extension/model"
import { extensionReducer } from "extension/store/reducer"
import { resetExtensionState } from "extension/store/state"
import React from "react"
import ReactDOM from "react-dom"
import * as en_translations from "resources/json/translations/en.json"
import * as fr_translations from "resources/json/translations/fr.json"
import { createHelpMenu, deleteHelpMenu } from "./common"

const extensionLoadedListeners: JExtensionLoadedListener[] = []
let areDataExtensionLoaded: boolean = false

export function addExtensionLoadedListener(listener: JExtensionLoadedListener): void {
  if (!areDataExtensionLoaded) {
    extensionLoadedListeners.push(listener)
  } else {
    try {
      listener()
    } catch (error) {
      console.error(error)
    }
  }
}

function checkExtensionLoadedListeners() {
  try {
    for (const listener of extensionLoadedListeners) {
      listener()
    }
  } catch (ex) {
    console.error(ex)
  }
  extensionLoadedListeners.clear()
}

function initExtensionData(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    resetExtensionState()
    areDataExtensionLoaded = false
    // Here you can fetch some extension data from server
    // that are required before starting anything else
  })
}

export function getAppExtension(): JAppExtension {
  const extension: JAppExtension = {
    id: EXTENSION_ID,
    isProjectExtension: true, // if "application" scoped extension, don't set
    // serverExtensionId: "extension-server-id",
    initFn: () => {
      initExtensionData().then(() => {
        createHelpMenu()
      })
    },
    destroyFn: () => {
      deleteHelpMenu()
    },
    storeReducer: extensionReducer,
    onPanelCreation: (panelContainerId: string) => {
      ReactDOM.render(<Extension />, document.getElementById(panelContainerId))
      onExtensionPanelActivation()
    },
    onPanelDestroy: (panelContainerId: string) => {
      const container = document.getElementById(panelContainerId)
      if (container) {
        ReactDOM.unmountComponentAtNode(container)
      }
      onExtensionPanelDeactivation()
    },
    serviceToExpose: dashboardSVC,
    panelTitle: {
      bundleId: EXTENSION_ID,
      key: EXTENSION_TITLE_TRANSLATION_KEY
    },
    panelIcon: "https://toppng.com/uploads/preview/atari-black-vector-logo-download-free-11573985708xngjbom7on.png",
    panelTooltip: {
      bundleId: EXTENSION_ID,
      key: EXTENSION_ICON_TOOLTIP_TRANSLATION_KEY
    },
    translationBundle: {
      id: EXTENSION_ID,
      translationsByLocale: {
        en: en_translations,
        fr: fr_translations
      }
    }
  }
  return extension
}

function onExtensionPanelActivation(): void {
  // the extension panel has been selected
  console.info(`${EXTENSION_ID} panel has been selected`)
}

function onExtensionPanelDeactivation(): void {
  // the extension panel has been unselected
  console.info(`${EXTENSION_ID} panel has been unselected`)
}
