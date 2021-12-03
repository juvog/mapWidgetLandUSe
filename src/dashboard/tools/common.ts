export function validateDashboardId(dashboardId: string): void {
  if (typeof dashboardId !== "string" || dashboardId.trim() === "") {
    throw Error("Missing dashboard id param")
  }
}
