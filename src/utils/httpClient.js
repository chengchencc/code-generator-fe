import request from '@/utils/request'

// post
export function httpPost (url, parameter) {
  return request({
    url: url,
    method: 'post',
    data: parameter
  })
}

// get
export function httpGet (url, parameter) {
  return request({
    url: url,
    method: 'get',
    params: parameter
  })
}

// put
export function httpPut (url, parameter) {
  return request({
    url: url,
    method: 'put',
    data: parameter
  })
}

// delete
export function httpDelete (url, parameter) {
  return request({
    url: url,
    method: 'delete',
    params: parameter
  })
}

// /** */ post method= {post | put}
// export function http (url, parameter, method) {
//   return request({
//     url: url,
//     method: method,
//     data: parameter
//   })
// }

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downFile (url, parameter) {
  return request({
    url: url,
    params: parameter,
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * 解析分页请求结果
 * @param {*} requestParameter
 * @param {*} res
 */
export function convertPagedResult (res, requestParameters) {
  var totalPage = res.count / requestParameters.pageSize + 1
  return {
    pageSize: requestParameters.pageSize,
    pageNo: requestParameters.pageNo,
    totalCount: res.count,
    totalPage: totalPage,
    data: res.data
  }
}
