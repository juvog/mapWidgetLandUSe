/**
 * MIT License http://www.opensource.org/licenses/mit-license.php Author Szymon Sasin
 * Laurent : This script is useful because when using tslint in .vue file
 *         : it triggers false positive "Consecutive blank lines are forbidden" at the beggining of the file
 *         : This script is only used as a loader for vue files (normal .ts file not impacted)
 */
module.exports = source => {
    let result = source.replace(/^\s+|\s+$/g, '')
    result += '\r\n'
    return result
}