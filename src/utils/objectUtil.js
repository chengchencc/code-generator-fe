/**
 * 深拷贝方法
 * @param {obj} obj 要拷贝的对象
 */
export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
