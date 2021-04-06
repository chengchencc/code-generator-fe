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
