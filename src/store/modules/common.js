import { getDicts } from '@/api/common'
const common = {
  state: {
    dict: {
      // 字典到值得映射，分为列表或者树
      codeToValue: {
        list: {},
        tree: {}
      },
      // 值到字典得映射，只有列表
      valueToCode: {
        list: {}
      }
    },
    formSchemas: []
  },
  mutations: {
    ADD_CODE_TO_VALUE_LIST: (state, { dictName, listDict }) => {
      state.dict.codeToValue.list[dictName] = listDict
    },
    ADD_CODE_TO_VALUE_TREE: (state, { dictName, treeDict }) => {
      state.dict.codeToValue.tree[dictName] = treeDict
    },
    ADD_VALUE_TO_CODE_LIST: (state, { dictName, listDict }) => {
      state.dict.valueToCode.list[dictName] = listDict
    },
    SET_FORM_SCHEMAS: (state, schemas) => {
      state.formSchemas = schemas
    }
  },
  actions: {
    /**
     *
     * @param {commit} param0 commit事件
     * @param {字典code} codes 字典code，值为数组
     * @param {是否为code到value的映射} isCodeToValue 是否为code到value的映射
     * @param {是否为list结构} isList 是否为list结构
     */
    getDicts ({ commit }, { codes, isCodeToValue, isList }) {
      getDicts(codes).then(res => {
        if (isList) {
          const dicts = getListMap(res.datas, isCodeToValue)
          for (const key in dicts) {
            if (isCodeToValue) {
              commit('ADD_CODE_TO_VALUE_LIST', { dictName: key, listDict: dicts[key] })
            } else {
              commit('ADD_VALUE_TO_CODE_LIST', { dictName: key, listDict: dicts[key] })
            }
          }
        } else {
          commit('ADD_CODE_TO_VALUE_TREE', { dictName: codes[0], treeDict: getTreeMap(res.datas) })
        }
      })
    }
  }
}
/**
 * 将返回值转换成字典
 * @param {要解析的数据} datas
 * @param {是否为CodeToValue} isCodeToValue
 */
const getListMap = (datas, isCodeToValue) => {
  const result = {}
  datas.forEach(item => {
    if (!result[item.dictCode]) {
      result[item.dictCode] = {}
    }
    if (isCodeToValue) {
      result[item.dictCode][item.code] = item.value
    } else {
      result[item.dictCode][item.value] = item.code
    }
  });
  return result
}

/**
 * 将数据集转换成树，暂不支持批量转换
 * @param {后端返回的数据集} datas 后端返回的数据集
 */
const getTreeMap = (datas) => {
  const copyList = datas.map(item => {
    return {
      value: item.code,
      label: item.value,
      parentDictValueCode: item.parentDictValueCode
    }
  })
  const tree = []
  for (let i = 0; i < copyList.length; i++) {
    for (let j = 0; j < copyList.length; j++) {
      if (copyList[i].parentDictValueCode == copyList[j].value) {
        if (!copyList[j].children) {
          copyList[j].children = []
        }
        copyList[j].children.push(copyList[i])
      }
    }

    if (!copyList[i].parentDictValueCode) {
      tree.push(copyList[i])
    }
  }
  return tree
}

export default common
