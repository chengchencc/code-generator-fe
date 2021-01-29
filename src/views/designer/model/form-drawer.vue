<template>
  <a-drawer
    :title="title"
    :width="modalWidth"
    :visible="visible"
    :maskClosable="true"
    placement="right"
    :closable="true"
    style="height: calc(100% - 0px);overflow: auto;padding-bottom: 53px;">

    <!-- title slot -->
    <template slot="title">
      <div style="width: 100%;">
        <span>{{ title }}</span>
        <span style="display:inline-block;width:calc(100% - 100px);padding-right:10px;text-align: right">
          <a-button @click="toggleScreen" icon="appstore" style="height:20px;width:20px;border:0px"></a-button>
        </span>
      </div>
    </template>

    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model" label="主键ID">
          <a-input v-decorator="['id', { initialValue: null }]" disabled />
        </a-form-item>
        <a-form-item label="租户Id">
          <a-input v-decorator="['tenantId',validatorRules.tenantId ]" />

        </a-form-item>
        <a-form-item label="编号">
          <a-input v-decorator="['code',validatorRules.code ]" />

        </a-form-item>
        <a-form-item label="描述">
          <a-input v-decorator="['description',validatorRules.description ]" />

        </a-form-item>
        <a-form-item label="名称">
          <a-input v-decorator="['name',validatorRules.name ]" />

        </a-form-item>
        <a-form-item label="是否发布">
          <a-switch v-decorator="['isPublished', { valuePropName: 'checked' }]" />

        </a-form-item>
        <a-form-item label="存储方式">
          <a-input v-decorator="['storageType',validatorRules.storageType ]" />

        </a-form-item>
        <a-form-item label="表名">
          <a-input v-decorator="['tableName',validatorRules.tableName ]" />

        </a-form-item>
        <a-form-item label="版本">
          <a-input v-decorator="['version',validatorRules.version ]" />

        </a-form-item>
      </a-form>
    </a-spin>
    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
// 表单字段
const fields = ['id', 'tenantId', 'code', 'description', 'name', 'isPublished', 'storageType', 'tableName', 'version']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      title: '新增',
      confirmLoading: false,
      modalWidth: 640,
      // 禁止提交
      disableSubmit: false,
      // 窗口最大化状态
      modaltoggleFlag: true,
      // 校验器
      validatorRules: {
        tenantId: { rules: [{ required: false }, { validator: this.validateTenantId }] },
        code: { rules: [{ required: false }, { validator: this.validateCode }] },
        description: { rules: [{ required: false }, { validator: this.validateDescription }] },
        name: { rules: [{ required: false }, { validator: this.validateName }] },
        isPublished: { rules: [{ required: false }, { validator: this.validateIsPublished }] },
        storageType: { rules: [{ required: false }, { validator: this.validateStorageType }] },
        tableName: { rules: [{ required: false }, { validator: this.validateTableName }] },
        version: { rules: [{ required: false }, { validator: this.validateVersion }] }
      }
    }
  },
  beforeCreate () {},
  created () {
    console.log('custom modal created')
    this.form = this.$form.createForm(this)

    // 防止表单未注册
    fields.forEach((v) => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      console.log('model change', this.model)
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  mounted () {
    // vue 生命周期钩子，已完成模板渲染，此处可以进行dom操作
  },
  methods: {
    // 窗口最大化切换
    toggleScreen () {
      if (this.modaltoggleFlag) {
        this.modalWidth = window.innerWidth
      } else {
        this.modalWidth = 640
      }
      this.modaltoggleFlag = !this.modaltoggleFlag
    },
    handleSubmit () {
      this.$emit('ok')
    },
    handleCancel () {
      this.$emit('cancel')
      // console.log('cancled')
    },
    // 自定义校验逻辑代码写在这里
    // 若校验成功，回调callback，参数为空 ： callback()
    // 若校验失败，回调callback ： callback('校验失败提示信息')
    // 示例如下：
    // 示例1：正则校验
    // eslint-disable-next-line standard/no-callback-literal
    // if (!value || new RegExp(/^1[3|4|5|7|8][0-9]\d{8}$/).test(value)) {
    //   callback()
    // } else {
    //   // eslint-disable-next-line standard/no-callback-literal
    //   callback('请输入正确格式的手机号码!')
    // }
    // 示例2：获取form中一个值，与当前输入值尽心比较
    // const form = this.form
    // const confirmPassword = form.getFieldValue('confirmPassword')
    // if (value && confirmPassword && value !== confirmPassword) {
    //   // eslint-disable-next-line standard/no-callback-literal
    //   callback('两次输入的密码不一样！')
    // }
    // if (value && this.confirmDirty) {
    //   form.validateFields(['confirm'], { force: true })
    // }
    // callback()
    validateTenantId (rule, value, callback) {
      callback()
      // callback(请输入正确的租户Id)
    },
    validateCode (rule, value, callback) {
      callback()
      // callback(请输入正确的编号)
    },
    validateDescription (rule, value, callback) {
      callback()
      // callback(请输入正确的描述)
    },
    validateName (rule, value, callback) {
      callback()
      // callback(请输入正确的名称)
    },
    validateIsPublished (rule, value, callback) {
      callback()
      // callback(请输入正确的是否发布)
    },
    validateStorageType (rule, value, callback) {
      callback()
      // callback(请输入正确的存储方式)
    },
    validateTableName (rule, value, callback) {
      callback()
      // callback(请输入正确的表名)
    },
    validateVersion (rule, value, callback) {
      callback()
      // callback(请输入正确的版本)
    }
  }
}
</script>
