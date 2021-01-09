import request from '@/utils/request'
const path = '/tdatadictvalue'
const urls = {
  list: path,
  item: path,
  save: path,
  delete: path
}

export const getList = (parameter) => {
  return request({
    url: urls.list,
    method: 'get',
    params: parameter
  })
}

export const findById = (id) => {
  return request({
    url: `${urls.item}/${id}`,
    method: 'get'
  })
}

export const save = (parameter) => {
  return request({
    url: urls.save,
    method: 'post',
    data: parameter
  })
}

export const deleteItem = (id) => {
  return request({
    url: `${urls.item}/${id}`,
    method: 'delete'
  })
}
