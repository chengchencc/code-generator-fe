<template>
  <div>
    <!-- 表信息 -->
    <!-- <a-form :form="form" v-bind="formLayout"> -->
    <a-form-model ref="form" :model="model" :rules="validatorRules" v-bind="formLayout">
      <!-- <a-card class="card" title="表单管理" :bordered="true" size="small"> -->
      <a-row class="form-row" :gutter="5">
        <!-- <form-item-wrapper v-if="model">
          <a-form-item label="主键ID">
            <a-input v-decorator="['id', { initialValue: null }]" disabled />
          </a-form-item>
        </form-item-wrapper> -->
        <form-item-wrapper>
          <a-form-model-item label="数据库表名" prop="tableName">
            <a-input v-model="model.tableName" />
          </a-form-model-item>
        </form-item-wrapper>

        <form-item-wrapper>
          <a-form-model-item label="编号" prop="code">
            <a-input v-model="model.code" />
          </a-form-model-item>
        </form-item-wrapper>

        <form-item-wrapper>
          <a-form-model-item label="名称" prop="name">
            <a-input v-model="model.name" />
          </a-form-model-item>
        </form-item-wrapper>
        <!-- <form-item-wrapper>
          <a-form-model-item label="编号" required prop="tableName">
            <a-input v-model="model.code" />
          </a-form-model-item>
        </form-item-wrapper> -->
        <form-item-wrapper>
          <a-form-model-item label="描述" prop="description">
            <a-input v-model="model.description" />
          </a-form-model-item>
        </form-item-wrapper>
        <form-item-wrapper>
          <a-form-model-item label="主键策略" required prop="tableIdType">
            <a-select v-model="model.tableIdType">
              <a-select-option key="ASSIGN_ID" value="ASSIGN_ID">自动生成(雪花算法)</a-select-option>
              <a-select-option key="AUTO" value="AUTO">数据库ID自增</a-select-option>
              <a-select-option key="NONE" value="NONE">未设置</a-select-option>
              <a-select-option key="ASSIGN_UUID" value="ASSIGN_UUID">自动生成(UUID)</a-select-option>
            </a-select>
          </a-form-model-item>
        </form-item-wrapper>
        <form-item-wrapper>
          <a-form-model-item label="生成策略" required>
            <a-select v-model="model.generatorRuleId">
              <!-- <a-select-option key="Default" value="Default">默认</a-select-option> -->
              <a-select-option v-for="(field,index) in ruleList" :key="index" :value="field.id">{{ field.ruleName }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </form-item-wrapper>
        <form-item-wrapper>
          <a-form-model-item label="表结构" required prop="tableSchema">
            <a-select v-model="model.tableSchema">
              <a-select-option key="Nomal" value="Nomal">一般表结构</a-select-option>
              <a-select-option key="Tree" value="Tree">树状结构</a-select-option>
            </a-select>
          </a-form-model-item>
        </form-item-wrapper>

        <form-item-wrapper v-if="model.tableSchema && model.tableSchema === 'Tree'">
          <a-form-model-item label="ParentIdField" required>
            <a-select v-model="model.parentId">
              <a-select-option v-for="(item,index) in model.fields" :key="index" :value="item.id">
                {{ item.name || item.code }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </form-item-wrapper>

        <form-item-wrapper v-if="model.tableSchema && model.tableSchema === 'Tree'">
          <a-form-model-item label="TreePathField" required>
            <a-select v-model="model.treeIdPathId">
              <a-select-option v-for="(item,index) in model.fields" :key="index" :value="item.id">
                {{ item.name || item.code }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </form-item-wrapper>

        <form-item-wrapper>
          <a-form-model-item label="表类型" required>
            <a-select v-model="model.tableType">
              <a-select-option key="SingleTable" value="SingleTable">单表</a-select-option>
              <a-select-option key="MainTable" value="MainTable">主表</a-select-option>
              <a-select-option key="OneToOneChildTable" value="OneToOneChildTable">子表，一对一</a-select-option>
              <a-select-option key="OneToManyChildTable" value="OneToManyChildTable">子表，一对多</a-select-option>
            </a-select>
          </a-form-model-item>
        </form-item-wrapper>

        <form-item-wrapper
          v-if="model.tableType && (model.tableType === 'OneToOneChildTable'|| model.tableType === 'OneToManyChildTable')">
          <a-form-model-item label="主实体" required>
            <a-select v-model="model.mainEntityId"
                      show-search
                      placeholder="请输入实体名称搜索"
                      @search="searchEntity"
                      @change="handleMainEntityChange"
                      :filter-option="false">
              <a-spin v-if="searching" slot="notFoundContent" />
              <a-select-option v-for="d in topEntities" :key="d.id" :value="d.id">
                {{ d.name }}
              </a-select-option>
              <!-- <a-select-option key="1" value="1">用户表1</a-select-option>
              <a-select-option key="2" value="2">组织表</a-select-option>
              <a-select-option key="3" value="3">角色表</a-select-option>
              <a-select-option key="4" value="4">业务表一</a-select-option> -->
            </a-select>
          </a-form-model-item>
        </form-item-wrapper>

      </a-row>
      <!-- </a-card> -->
    </a-form-model>
  </div>

</template>

<script>
import pick from 'lodash.pick'
import { getRuleList } from '@/api/generatorRule'
import { FormItemWrapper } from '@/components'
import debounce from 'lodash/debounce'
import { httpGet } from '@/utils/httpClient'
import { findEntityById, searchByName } from '../api'

export default {
  name: 'MainForm',
  components: { FormItemWrapper },
  props: {
    model: {
      type: Object,
      default: () => {
        return {
          tableName: '',
          name: '',
          code: '',
          description: '',
          tableSchema: '',
          tableType: '',
          tableIdType: '',
          uiTemplate: '',
          parentId: ''
        }
      }
    }
  },
  data () {
    return {
      ruleList: [],
      // 布局
      formLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
          md: { span: 7 },
          lg: { span: 7 },
          xl: { span: 7 },
          xxl: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
          md: { span: 17 },
          lg: { span: 17 },
          xl: { span: 17 },
          xxl: { span: 17 }
        }
      },
      // 模型
      // model: {
      //   tableName: '',
      //   name: '',
      //   description: '',
      //   tableSchema: '',
      //   tableType: '',
      //   tableIdType: '',
      //   uiTemplate: ''
      // },
      // 校验规则
      validatorRules: {
        tableName: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 0, max: 36, message: '最大长度36', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 0, max: 36, message: '最大长度36', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 0, max: 36, message: '最大长度36', trigger: 'blur' }
        ],
        description: [
          { required: false, message: '必填', trigger: 'blur' },
          { min: 0, max: 255, message: '最大长度255', trigger: 'blur' }
        ],
        tableSchema: [{ required: true, message: '必填', trigger: 'blur' }],
        tableType: [{ required: true, message: '必填', trigger: 'blur' }],
        tableIdType: [{ required: true, message: '必填', trigger: 'blur' }],
        generatorRuleId: [{ required: true, message: '必填', trigger: 'blur' }],
        uiTemplate: [{ required: false, message: '必填', trigger: 'blur' }]
      },
      searching: false,
      // 实体选择框
      topEntities: []
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    getRuleList()
      .then((res) => {
        if (res && Array.isArray(res)) {
          this.ruleList = res
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted () {
    console.log('mainform::mounted::', this.model)
    this.$watch('model', (s) => {
      console.log('mainform::modelChanged::', this.model)

      // this.model = this.value
    })
    this.initDict()
    // this.fields = this.model.fields
  },
  methods: {
    initDict () {
      if (this.model || this.model.mainEntityId) {
        findEntityById(this.model.mainEntityId).then((res) => {
          this.topEntities.push(res)
        })
      }
    },
    searchEntity: debounce(function (value) {
      console.log('search::{}', value)
      this.topEntities = []
      this.searching = true
      searchByName({ name: value }).then((res) => {
        console.log(res)
        this.searching = false
        this.topEntities = res
      })
      // setTimeout(() => {
      //   this.topEntities = [{ text: '111', value: '111' }]
      // }, 2000)
    }, 800),
    handleMainEntityChange () {
      console.log('handleMainEntityChange')
    },
    handleChange () {
      console.log(arguments)
    },
    getSaveData () {
      let result = 'a'
      this.$refs.form.validate((valid, values) => {
        console.log('MainForm::validate::Arguments::', valid, values)
        if (valid) {
          result = this.model
        } else {
          console.log('error submit!!')
          result = false
        }
      })
      console.log(result)
      return result
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
