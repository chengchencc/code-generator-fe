import { httpDelete, httpGet, httpPost } from '@/utils/httpClient'

const path = '/api-test/dataModel'

export const findPageList = (params) => httpGet('/api-test/dataModel/page', params)

export const deleteItem = (params) => httpDelete(path, params)

export const saveItem = (params) => httpPost(path, params)

export const getTableInfos = (params) => httpPost('/api-test/datasource/getTableInfos', params)

export const importFromDb = (params) => httpPost('/api-test/datasource/importFromDb', params)

export const saveDataModel = (params) => httpPost('/api-test/dataModel/saveDataModel', params)
