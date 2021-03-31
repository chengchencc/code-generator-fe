export const TypeHelper = {
  isString: (obj) => typeof obj === 'string' || obj instanceof String,
  isBoolean: (obj) => typeof obj === 'boolean' || obj instanceof Boolean,
  isFunction: (obj) => typeof obj === 'function' || obj instanceof Function,
  isNumber: (obj) => typeof obj === 'number' || obj instanceof Number,
  isArray: (obj) => Object.prototype.toString.call(obj) === '[object Array]',
  isMap: (obj) => Object.prototype.toString.call(obj) === '[object Map]',
  isSet: (obj) => Object.prototype.toString.call(obj) === '[object Set]',
  isDate: (obj) => Object.prototype.toString.call(obj) === '[object Date]',
  isObject: (obj) => Object.prototype.toString.call(obj) === '[object object]'
}
