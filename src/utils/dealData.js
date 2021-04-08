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