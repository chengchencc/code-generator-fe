import { httpDelete, httpGet, httpPost } from '@/utils/httpClient'

const path = '/dataModel'

export const findPageList = (params) => httpGet('/dataModel/page', params)

export const deleteItem = (params) => httpDelete(path, params)

export const saveItem = (params) => httpPost(path, params)

export const getTableInfos = (params) => httpPost('/datasource/getTableInfos', params)
