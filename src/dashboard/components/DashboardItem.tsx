import { Button, makeStyles, Theme, Typography } from "@material-ui/core"
import { JExtDashboard } from "dashboard/model"
import { dashboardSVC } from "dashboard/service-extension"
import { translate } from "extension/tools/language"
import React from "react"

export interface JDashboardItemProps {
  dashboard: JExtDashboard
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "1rem",
    overflow: "scroll"
  },
  item: {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "padding": ".5rem",
    "border": "1px solid transparent",
    "borderRadius": ".5rem",
    "&:hover": {
      borderColor: theme.palette.action.active
    }
  }
}))

export const DashboardItem = (props: JDashboardItemProps) => {
  const classes = useStyles()

  return (
    <div id={`extension-dashboard-list-${props.dashboard.id}`} key={props.dashboard.id} className={classes.item}>
      <Typography color="textPrimary">{props.dashboard.name}</Typography>
      <Button onClick={() => dashboardSVC.deleteById(props.dashboard.id)}>{translate("delete")}</Button>
    </div>
  )
}
