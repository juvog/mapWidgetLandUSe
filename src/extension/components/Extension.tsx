import { createGenerateClassName, MuiThemeProvider, StylesProvider } from "@material-ui/core/styles"
import { DashboardPanel } from "dashboard/components/DashboardPanel"
import { EXTENSION_ID } from "extension/model"
import { getAppState } from "extension/store/state"
import { getStore } from "extension/store/store"
import { JCoreState } from "jmap-core"
import React from "react"
import { connect, Provider } from "react-redux"

interface JExtensionProps {
  theme: { [key: string]: string }
}

const generateClassName = createGenerateClassName({
  seed: EXTENSION_ID
})

const ExtensionFn = (props: JExtensionProps) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={props.theme}>
        <DashboardPanel />
      </MuiThemeProvider>
    </StylesProvider>
  )
}

const ExtensionConnect = connect(
  (state: JCoreState) =>
    ({
      theme: getAppState(state).ui.theme
    } as JExtensionProps)
)(ExtensionFn)

export const Extension = (): JSX.Element => {
  return (
    <Provider store={getStore()}>
      <ExtensionConnect />
    </Provider>
  )
}
