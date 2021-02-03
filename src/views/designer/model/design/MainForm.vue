<template>
  <div>
    <!-- 表信息 -->
    <!-- <a-form :form="form" v-bind="formLayout"> -->
    <a-form-model :model="model" :rules="validatorRules" v-bind="formLayout">
      <!-- <a-card class="card" title="表单管理" :bordered="true" size="small"> -->
      <a-row class="form-row" :gutter="5">
        <!-- <form-item-wrapper v-if="model">
          <a-form-item label="主键ID">
            <a-input v-decorator="['id', { initialValue: null }]" disabled />
          </a-form-item>
        </form-item-wrapper> -->
        <form-item-wrapper>
          <a-form-model-item label="数据库表名" required prop="tableName">
            <a-input v-model="model.tableName" />
          </a-form-model-item>
        </form-item-wrapper>

        <form-item-wrapper>
          <a-form-model-item label="编号" required prop="tableName">
            <a-input v-model="model.code" />
          </a-form-model-item>
        </form-item-wrapper>

        <form-item-wrapper>
          <a-form-model-item label="名称" required prop="tableName">
            <a-input v-model="model.name" />
          </a-form-model-item>
        </form-item-wrapper>
        <form-item-wrapper>
          <a-form-model-item label="编号" required prop="tableName">
            <a-input v-model="model.code" />
          </a-form-model-item>
        </form-item-wrapper>
        <form-item-wrapper>
          <a-form-model-item label="描述" required prop="tableName">
            <a-input v-model="model.description" />
          </a-form-model-item>
        </form-item-wrapper>
        <form-item-wrapper>
          <a-form-model-item label="主键策略" required>
            <a-select v-model="model.tableIdType">
              <a-select-option key="ASSIGN_ID" value="ASSIGN_ID">自动生成(雪花算法)</a-select-option>
              <a-select-option key="AUTO" value="AUTO">数据库ID自增</a-select-option>
              <a-select-option key="NONE" value="NONE">未设置</a-select-option>
              <a-select-option key="ASSIGN_UUID" value="ASSIGN_UUID">自动生成(UUID)</a-select-option>
            </a-select>
          </a-form-model-item>
        </form-item-wrapper>
        <form-item-wrapper>
          <a-form-model-item label="表单模板" required>
            <a-select v-model="model.uiTemplate">
              <a-select-option key="Default" value="Default">默认</a-select-option>
            </a-select>
          </a-form-model-item>
        </form-item-wrapper>
        <form-item-wrapper>
          <a-form-model-item label="表结构" required>
            <a-select v-model="model.tableSchema">
              <a-select-option key="Nomal" value="Nomal">一般表结构</a-select-option>
              <a-select-option key="Tree" value="Tree">树状结构</a-select-option>
            </a-select>
          </a-form-model-item>
        </form-item-wrapper>

        <form-item-wrapper v-if="model.tableSchema && model.tableSchema === 'Tree'">
          <a-form-model-item label="ParentId" required>
            <a-select v-model="model.parentId">
              <a-select-option key="pId" value="pId">一般表结构</a-select-option>
              <a-select-option key="parentId" value="parentId">树状结构</a-select-option>
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
            <a-select v-model="model.mainEntityId">
              <a-select-option key="1" value="1">用户表</a-select-option>
              <a-select-option key="2" value="2">组织表</a-select-option>
              <a-select-option key="3" value="3">角色表</a-select-option>
              <a-select-option key="4" value="4">业务表一</a-select-option>
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
import FormItemWrapper from '../component/FormItemWrapper'

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
          description: '',
          tableSchema: '',
          tableType: '',
          tableIdType: '',
          uiTemplate: ''
        }
      }
    }
  },
  data () {
    return {
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
        tenantId: { rules: [{ required: false }] },
        code: { rules: [{ required: false }] },
        description: { rules: [{ required: false }] },
        name: { rules: [{ required: false }] },
        isPublished: { rules: [{ required: false }] },
        storageType: { rules: [{ required: false }] },
        tableName: { rules: [{ required: false }] },
        version: { rules: [{ required: false }] }
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted () {
    console.log('mainform::mounted::', this.model)
    this.$watch('model', (s) => {
      console.log('mainform::modelChanged::', this.model)

      // this.model = this.value
    })
  },
  methods: {}
}
</script>

<style lang="sass" scoped>
</style>
