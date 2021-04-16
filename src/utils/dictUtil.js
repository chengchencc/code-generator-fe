import { getDicts } from '@/api/common'
import { httpGet, httpPost } from './httpClient'

/**
 * 获取字典并转换为
 * @param {*} codes String[]
 * @returns
 */
export const getDictionaryByCodes = (codes) => {
  return getDicts(codes).then(res => {
    return convertDictionaryToMapList(res.datas)
  })
}
/**
 * 转换字典为字典格式
 * @param {*} dictValue
 * @param {*} dictField
 */
export const convertDictionaryToMapList = (dictValue) => {
  const dict = {}
  dictValue.forEach((dictItem) => {
    if (!dict[dictItem.dictCode]) {
      dict[dictItem.dictCode] = []
    }
    dict[dictItem.dictCode].push(dictItem)
  })
  console.log(dict)
  console.log('res::', dictValue)
  return dict
}


/**
 * 显示字典对应key的名字 
 * @param {*} code code
 * @param {*} dict 字典数组
 * @returns 对应名字
 */
 export function getNameByDict (code, dict) {
  for( let i=0;i<dict.length;i++) {
    if(dict[i].code == code) {
    return dict[i].value
    }
  }
  return ''
}

/**
 * 显示字典对应key的名字 
 * @param {*} code code
 * @param {*} dict 字典数组
 * @returns 对应名字
 */
 export function getManyNameByDict (code, dict) {
  if(!code) {
    return code
  }

  if(dict.length == 0){
    return code
  }
  
  code = JSON.parse(code);
  if(!Array.isArray(code)) {
    return code
  }
  let str = [];
  for( let i=0;i<dict.length;i++) {
    for( let c=0;c<code.length;c++) {
      if(dict[i].code == code[c]) {
        str.push(dict[i].value)
      }
    }
  }
  return str.join(',')
}