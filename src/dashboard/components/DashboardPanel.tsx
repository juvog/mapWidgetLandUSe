import { makeStyles, Theme } from "@material-ui/core"
import { JExtDashboard } from "dashboard/model"
import { getExtensionState } from "extension/store/state"
import { JCoreState } from "jmap-core"
import { default as React } from "react"
import { connect } from "react-redux"
import { LandUse } from "./LandUse"

export interface JDashboardPanelProps {
  dashboards: JExtDashboard[]
  isLoading: boolean
  hasLoadingError: boolean
  center: JLocation
  layers: { [treeElementId: string]: JLayerTreeElement }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "1rem",
    overflow: "scroll"
  },
  header: {
    display: "flex",
    flexDirection: "column"
  }
}))

const DashboardPanelFn = (props: JDashboardPanelProps) => {
  const classes = useStyles()

  return (
    <LandUse />

    // <ErrorBoundary>
    //   <List id="extension-dashboard-list" className={classes.root}>
    //     {props.hasLoadingError ? (
    //       <Typography color="error" id={"extension-dashboard-list-error"}>
    //         {translate("dashboard.loading.error")}
    //       </Typography>
    //     ) : props.isLoading ? (
    //       <CircularProgress id={"extension-dashboard-list-loading"} size={16} />
    //     ) : props.dashboards.length === 0 ? (
    //       <div className={classes.header}>
    //         <Typography color="textSecondary">{translate("dashboard.empty")}</Typography>
    //       </div>
    //     ) : (
    //       <>
    //         {/* <div className={classes.header}>
    //           <Typography color="textPrimary">{translate("dashboard.list.title")}</Typography>
    //         </div> */}

    //         <LandUse />

    //         {/* {props.dashboards.map(dashboard => (
    //           <DashboardItem dashboard={dashboard} key={dashboard.id} />
    //         ))} */}
    //       </>
    //     )}
    //   </List>
    // </ErrorBoundary>
  )
}

export const DashboardPanel = connect((state: JCoreState) => {
  return {
    dashboards: getExtensionState(state).dashboard.dashboards,
    isLoading: getExtensionState(state).dashboard.isLoading,
    hasLoadingError: getExtensionState(state).dashboard.hasLoadingError,
    layers: state.layer.allById
  } as JDashboardPanelProps
})(DashboardPanelFn)
