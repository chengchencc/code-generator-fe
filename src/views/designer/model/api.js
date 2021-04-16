import { httpDelete, httpGet, httpPost } from '@/utils/httpClient'

const path = '/api-grt/dataModel'

export const findPageList = (params) => httpGet('/api-grt/dataModel/page', params)

export const deleteItem = (params) => httpDelete(path, params)

export const saveItem = (params) => httpPost(path, params)

export const getTableInfos = (params) => httpPost('/api-grt/datasource/getTableInfos', params)

export const importFromDb = (params) => httpPost('/api-grt/datasource/importFromDb', params)

export const saveDataModel = (params) => httpPost('/api-grt/dataModel/saveDataModel', params)
