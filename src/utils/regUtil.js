// 正则表达式工具类，提供常用的正则表达式校验

/**
 * 身份证号正则
 */
export const idCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/

/**
 * 手机号正则
 */
export const phoneNumber = /^1[3456789]\d{9}$/

/**
 * 密码强度校验 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 */
export const passWord = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/

/**
 * 邮件正则校验
 */
// eslint-disable-next-line no-useless-escape
export const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

/**
 * 车牌号校验
 */
export const licensePlateNo = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/

// test
console.log('Phone Number', phoneNumber.test('17865169605'))
console.log('ID Card', idCard.test('32087419970908473X'))
console.log('Password', passWord.test('ludan123456A?'))
console.log('Email', email.test('ynlbq@outlook.com'))
console.log('license plate number', licensePlateNo.test('鲁Q0YE11'))
