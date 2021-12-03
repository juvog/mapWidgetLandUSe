/**
 * @author : Laurent Mignonat
 * @copyright (c) 2004-2018 K2 Geospatial, Inc. All Rights Reserved.
 */
const path = require("path")
const join = path.join // shortcut
const del = require("del")
const fs = require("fs")
const gulp = require("gulp")
const tslint = require("gulp-tslint")
const plumber = require("gulp-plumber")
const webpack = require("webpack")
const webpackStream = require("webpack-stream")
const WebpackDevServer = require("webpack-dev-server")
const execSync = require("child_process").execSync

console.log(`\nBuilding using ${__dirname}/gulpfile.js\n`)
const existEnvConfigFile = fs.existsSync("env-config.js")
if (existEnvConfigFile) {
  // we'll use variables defined in this file instead of the ones defined by sys. env.
  const toCheckVariables = ["NODE_ENV", "BUILD_DIR", "WEBPACK_ANALYSE", "DEV_PORT"]
  const envConfig = require("./env-config.js")

  toCheckVariables.forEach(variable => {
    if (envConfig.hasOwnProperty(variable)) {
      process.env[variable] = envConfig[variable]
      console.log(`"env-config.js" defined "${variable}" as "${process.env[variable]}"`)
    }
  })
  console.log("")
}

/******************************* DEFAULT ENV VALUES *******************************/

const ENV_PROD = "production"
const ENV_DEV = "development"
const APP_DEV_PORT = process.env.APP_DEV_PORT === undefined ? 8082 : Number(process.env.APP_DEV_PORT)
const DEV_PORT = process.env.DEV_PORT === undefined ? 8083 : Number(process.env.DEV_PORT)

if (process.env.WEBPACK_ANALYSE === undefined || process.env.WEBPACK_ANALYSE === "") {
  process.env.WEBPACK_ANALYSE = false
}

if (
  !process.env.NODE_ENV ||
  [undefined, ""].indexOf(process.env.NODE_ENV) !== -1 ||
  [ENV_PROD, ENV_DEV].indexOf(process.env.NODE_ENV.toLowerCase()) === -1
) {
  process.env.NODE_ENV = ENV_PROD
}

/********************************** ENVIRONMENT ***********************************/

console.log(`Environment : ${process.env.NODE_ENV}\n`)

const isForDevelopment = () => process.env.NODE_ENV === ENV_DEV

/******************************** PATHS ********************************/

// __dirname is the directory witch contains the gulpfile.js file
const WEB_DIR = join(__dirname, "../")
const DEFAULT_BUILD_DIR = join(WEB_DIR, "/public")
const BUILD_DIR = process.env.BUILD_DIR ? process.env.BUILD_DIR : DEFAULT_BUILD_DIR
const SRC_DIR = join(WEB_DIR, "/src")
const HTML_DIR = join(SRC_DIR, "/resources/html")

process.env.BUILD_DIR = BUILD_DIR

console.log("Build directories :")
console.log(`  Build  => ${BUILD_DIR}`)
console.log(`  Source => ${SRC_DIR}`)

/************************************* VERSION ************************************/

/**
 * Compare NPM version in order to know if we have to NPM publish
 *   ex :
 *    - currentVersion = "2.1.2" & publishedVersion = "2.3.0"
 *      => return false (because 2.1.2 is smaller and has already been published)
 *    - currentVersion = "2.3.2" & publishedVersion = "2.3.0"
 *      => return true (because 2.3.2 is greater and hasn't already been published)
 *
 * @param {string} currentVersion NPM version in package.json
 * @param {string} publishedVersion latests version published on NPM
 */
function isNewNpmVersion(currentVersion, publishedVersion) {
  if (currentVersion !== publishedVersion) {
    const currentSplit = currentVersion.split(".")
    const publishedSplit = publishedVersion.split(".")
    for (let i = 0; i < currentSplit.length; i++) {
      const currentValue = Number(currentSplit[i])
      const publishedValue = Number(publishedSplit[i])
      if (currentValue != publishedValue) {
        return currentValue > publishedValue
      }
    }
  }
  return false
}

let packageName
let currentNpmVersion
let hasToPublishNPM = false
let userDefinedWebpackPublicPath = process.env.WEBPACK_PUBLIC_PATH
gulp.task("check-npm-version", cb => {
  const packageJSON = JSON.parse(fs.readFileSync("../package.json"))
  packageName = packageJSON.name
  currentNpmVersion = packageJSON.version
  const publishedNpmVersion = execSync(`npm show ${packageName} version`).toString().trim()
  if (isNewNpmVersion(currentNpmVersion, publishedNpmVersion)) {
    console.log(`NPM versions { old: "${publishedNpmVersion}", new: "${currentNpmVersion}" }`)
    if (existEnvConfigFile) {
      console.warn("WARNING ! Cannot publish new version because you are in development !")
      return cb()
    }
    if (process.env.NODE_ENV !== ENV_PROD) {
      console.warn("WARNING ! Cannot publish new version because env is not production !")
      return cb()
    }
    hasToPublishNPM = true
  }
  cb()
})

gulp.task("publish-npm", cb => {
  if (hasToPublishNPM) {
    execSync(`npm publish`, { cwd: WEB_DIR })
    console.log(`New npm version published (public path = "${process.env.WEBPACK_PUBLIC_PATH}")`)
  }
  cb()
})

/************************************** CLEAN *************************************/

gulp.task("clean", () => {
  const toDelDirs = [join(BUILD_DIR, `${isForDevelopment() ? "extension/" : ""}/**/*`)]
  return del(toDelDirs, { force: true })
})

/************************************* LINTING ************************************/

gulp.task("lint", () => {
  const toLintFiles = [join(SRC_DIR, "/**/*.ts"), join(SRC_DIR, "/**/*.tsx")]
  return gulp
    .src(toLintFiles)
    .pipe(
      tslint({
        formatter: "msbuild",
        configuration: "./tslint.json"
      })
    )
    .pipe(
      tslint.report({
        emitError: !isForDevelopment()
      })
    )
})

/************************************* WEBPACK ***********************************/

gulp.task("webpack-server", cb => {
  // https://github.com/webpack/docs/wiki/webpack-dev-server
  // https://webpack.js.org/configuration/dev-server
  const config = require("./webpack.config.js")
  config.output.path = path.join(__dirname, "build")
  config.output.publicPath = `https://localhost:${DEV_PORT}/build/`
  config.entry.index = [
    `webpack-dev-server/client?https://localhost:${DEV_PORT}/`,
    "webpack/hot/dev-server",
    config.entry.index
  ]
  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, "../public"),
    publicPath: `https://localhost:${DEV_PORT}/build/`,
    https: true,
    hot: true,
    index: path.join(__dirname, "build/index.html"),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  })
  server.listen(DEV_PORT)
  cb()
})

gulp.task("webpack-public", cb => {
  // build with CDN PUBLIC_PATH
  // Result of this build will be accessible in NPM
  if (hasToPublishNPM) {
    process.env.HAS_TO_PUBLISH_NPM = true
    process.env.WEBPACK_PUBLIC_PATH = `https://cdn.jsdelivr.net/npm/${packageName}@${currentNpmVersion}/public/`
    return gulp
      .src(join(SRC_DIR, "/extension.ts"))
      .pipe(plumber()) // display tslint errors on production
      .pipe(webpackStream(require("./webpack.config.js"), require("webpack")))
      .pipe(plumber.stop())
      .pipe(gulp.dest(BUILD_DIR))
  } else {
    console.error("You need to change the package version in order to publish it !")
  }
  cb()
})

gulp.task("analyse-webpack", cb => {
  process.env.WEBPACK_PUBLIC_PATH = "../../services/jmap/app/"
  process.env.WEBPACK_ANALYSE = true
  return gulp
    .src(join(SRC_DIR, "/extension.ts"))
    .pipe(plumber()) // display tslint errors on production
    .pipe(webpackStream(require("./webpack.config.js"), require("webpack")))
    .pipe(plumber.stop())
    .pipe(gulp.dest(join(BUILD_DIR, "app")))
})

gulp.task("webpack", gulp.series("webpack-public", "publish-npm"))

/********************************** COPY HTML **********************************/

gulp.task("copy-html", () => {
  return gulp.src([join(HTML_DIR, "/**/*")]).pipe(gulp.dest(BUILD_DIR))
})

gulp.task("copy-html-server", cb => {
  if (!fs.existsSync(path.join(DEFAULT_BUILD_DIR, "index.html"))) {
    return gulp.src([join(HTML_DIR, "/dev/index.html")]).pipe(gulp.dest(DEFAULT_BUILD_DIR))
  }
  cb()
})

/********************************** PUBLIC TASKS **********************************/

gulp.task("start", gulp.series("lint", "copy-html-server", "webpack-server"))

// Main task, the only task that should be call
gulp.task("build", gulp.series("lint", "clean", "check-npm-version", "webpack", "copy-html"))

gulp.task("default", gulp.series("build"))
