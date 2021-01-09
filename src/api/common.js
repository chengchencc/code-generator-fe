import request from '@/utils/request'
const appApis = {
  GET_DICTS: '/api-cm/sysdatadictvalue/findByDictCode',
  GET_FILE_BY_ID: '/api-file/files/view/',
  DOWN_FILE_BY_ID: '/api-file/files/'
}

/**
 * 获取指定code的字典值
 * @param {字典code} codes 字典code，数组格式
 */
export const getDicts = (codes) => {
  return request({
    url: appApis.GET_DICTS,
    method: 'post',
    data: { data: codes }
  })
}

/**
 * 基于文件id 获取文件的详细信息
 * @param {文件id} fileId 文件id
 */
export const getFileByFileId = (fileId) => {
  return request({
    url: appApis.GET_FILE_BY_ID + fileId,
    method: 'get'
  })
}
/**
 * 基于文件id 获取文件的详细信息
 * @param {文件id} fileId 文件id
 */
export const downLoadByFileId = (fileId) => {
  return request({
    url: appApis.DOWN_FILE_BY_ID + fileId,
    method: 'get',
    responseType: 'blob'
  })
}
