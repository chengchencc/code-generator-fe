import request from '@/utils/request'
const path = '/api-test'
const urls = {
  list: '/generatorRule/details',
}

export const getRuleList = (parameter) => {
  return request({
    url: path + urls.list,
    method: 'get',
    params: parameter
  })
}

/* export const getList = (parameter) => {
  return request({
    url: urls.list,
    method: 'get',
    params: parameter
  })
}

export const save = (parameter) => {
  return request({
    url: urls.save,
    method: 'post',
    data: parameter
  })
}
 */