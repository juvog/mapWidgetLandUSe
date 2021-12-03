import React from "react"
import { Typography } from "@material-ui/core"
import { translate } from "extension/tools/language"

interface JErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<any, JErrorBoundaryState> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  public componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true })
    console.error(error, info)
  }

  public render() {
    if (this.state.hasError) {
      return <Typography color="error">{translate("error.unexpected")}</Typography>
    }
    return this.props.children
  }
}
