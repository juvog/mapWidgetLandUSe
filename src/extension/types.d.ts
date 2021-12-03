// Needed to import json file
declare module "*.json" {
  const value: any
  export default value
}

declare module "*.png" {
  const value: any
  export = value
}

declare module "*.jpeg" {
  const value: any
  export = value
}

// This constants are used by WebPack, it will change it by their real values,
// but TS doesn't know it and we need to declare their types.
declare const EXTENSION_VERSION: string

declare module "@turf/line-to-polygon"
declare module "@turf/bbox"
declare module "@turf/distance"

declare interface Window {
  JMAP_OPTIONS?: JCoreOptions
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

declare interface JCoreOptions {
  extension_help_link?: string
}
