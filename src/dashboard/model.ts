export interface VictoryDiagramType {
  x: string
  y: number
  couleur: string
}

export enum DASHBOARD_TYPES {
  CHART = "CHART",
  PIE = "PIE"
}

export interface JExtDashboardAddParams {
  name: string
  layerId: JId
  type: DASHBOARD_TYPES
}

export interface JExtDashboard {
  id: string
  name: string
  layerId: JId
  type: DASHBOARD_TYPES
}

export interface JExtDashboardState {
  dashboards: JExtDashboard[]
  isLoading: boolean
  hasLoadingError: boolean
}

export interface JExtDashboardRepository {
  getAll(): Promise<JExtDashboard[]>
  add(dashboard: JExtDashboardAddParams): Promise<string>
  deleteById(dashboardId: string): Promise<void>
}

export interface JExtDashboardService {
  getAll(): JExtDashboard[]
  existById(dashboardId: string): boolean
  getById(dashboardId: string): JExtDashboard
  add(dashboard: JExtDashboardAddParams): Promise<JExtDashboard>
  deleteById(dashboardId: string): Promise<void>
}
