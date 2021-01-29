/**
 * 深拷贝方法一:序列化反序列化
 * @param {obj} obj 要拷贝的对象
 */
export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 深拷贝方式二
 * @param {*} data
 */
export function deepCopy2 (data) {
  if (typeof data !== 'object' || data === null) {
        throw new TypeError('传入参数不是对象')
    }
  const newData = {}
  const dataKeys = Object.keys(data)
  dataKeys.forEach(value => {
     const currentDataValue = data[value]
     // 基本数据类型的值和函数直接赋值拷贝
     if (typeof currentDataValue !== 'object' || currentDataValue === null) {
          newData[value] = currentDataValue
      } else if (Array.isArray(currentDataValue)) {
         // 实现数组的深拷贝
        newData[value] = [...currentDataValue]
      } else if (currentDataValue instanceof Set) {
         // 实现set数据的深拷贝
         newData[value] = new Set([...currentDataValue])
      } else if (currentDataValue instanceof Map) {
         // 实现map数据的深拷贝
         newData[value] = new Map([...currentDataValue])
      } else {
         // 普通对象则递归赋值
         newData[value] = deepCopy(currentDataValue)
      }
   })
  return newData
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj (obj) {
  if (!(typeof obj === 'object')) {
    return
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key) &&
      // eslint-disable-next-line eqeqeq
      (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
      delete obj[key]
    }
  }
  return obj
}
