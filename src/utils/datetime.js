import moment from 'moment'

/**
 * 时间戳转化为时间类型，支持10位-13位时间戳
 * @param {时间戳} timestamp
 * @param {时间格式，默认'YYYY-MM-DD HH:mm:ss'} pattern
 */
export function parseTimestamp (timestamp, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (timestamp < 1000000000000) {
    return moment(timestamp * 1000).format(pattern)
  }
  return moment(timestamp).format(pattern)
}
/**
 * 时间戳转日期
 * @param {number} timestamp 时间戳
 */
export function parseToDate (timestamp) {
  return parseTimestamp(timestamp, 'YYYY-MM-DD')
}
/**
 * 时间戳转日期时间格式
 * 1608080909963 -> 2020-12-16 9:08:29
 * @param {number} timestamp 时间戳
 */
export function parseToDateTime (timestamp) {
  if (timestamp == null) {
    return ''
  } else {
    return parseTimestamp(timestamp, 'YYYY-MM-DD HH:mm:ss')
  }
}
/**
 * utc 日期时间格式化
 * 2020-12-15T08:17:35.536+0000 -> 2020-12-15 08:17:35
 * @param {*} utcTime UTC日期时间字符串
 */
export function toDateTime (utcTime) {
  if (utcTime == null) {
    return ''
  } else {
    return moment(utcTime).format('YYYY-MM-DD HH:mm:ss')
  }
}
/**
 * UTC 日期格式化
 * 2020-12-15T08:17:35.536+0000 -> 2020-12-15
 * @param {*} utcTime UTC DateTime 字符串
 */
export function toDate (utcTime) {
  if (utcTime == null) {
    return ''
  } else {
    return moment(utcTime).format('YYYY-MM-DD')
  }
}

export function sortorder (a, b) {
  a = a === null ? '0' : toDateTime(a)
  b = b === null ? '0' : toDateTime(b)
  return Date.parse(a) - Date.parse(b)
}
