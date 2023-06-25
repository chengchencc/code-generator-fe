import { httpDelete, httpGet, httpPost } from '@/utils/httpClient'
import request from '@/utils/request'

export const findPageList = (params) => httpGet('/api-grt/dataModel/page', params)

export const deleteItem = (params) => httpDelete('/api-grt/dataModel', params)

export const deleteBatch = (params) => httpDelete('/api-grt/dataModel/deleteBatch', params)

export const saveItem = (params) => httpPost('/api-grt/dataModel', params)

export const getTableInfos = (params) => httpPost('/api-grt/datasource/getTableInfos', params)

export const importFromDb = (params) => httpPost('/api-grt/datasource/importFromDb', params)

export const saveDataModel = (params) => httpPost('/api-grt/dataModel/saveDataModel', params)

export const exportBatchToZip = (params) => request({
    url: '/api-grt/generator/exportBatchToZip',
    data: params,
    method: 'post',
    responseType: 'blob'
  })

export const searchByName = (params) => httpGet('/api-grt/dataModel/findTop10ByNameStartsWith', params)
export const findEntityById = (id) => httpGet(`/api-grt/dataModel/detail/${id}`)
