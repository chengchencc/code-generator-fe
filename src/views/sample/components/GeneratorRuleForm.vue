<template>
  <a-spin :spinning="loading">
    <a-form :form="form" v-bind="formLayout">
      <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
      <a-form-item v-show="model" label="主键ID">
        <a-input v-decorator="['id', { initialValue: null }]" disabled />
      </a-form-item>
      <a-form-item label="字典编码">
        <a-input v-decorator="['dictCode',validatorRules.dictCode ]" />

      </a-form-item>
      <a-form-item label="字典值编码">
        <a-input v-decorator="['code',validatorRules.code ]" />

      </a-form-item>
      <a-form-item label="字典值">
        <a-input v-decorator="['value',validatorRules.value ]" />

      </a-form-item>
      <a-form-item label="父字典值编码">
        <a-input v-decorator="['parentDictValueCode',validatorRules.parentDictValueCode ]" />

      </a-form-item>
      <a-form-item label="排序">
        <a-input v-decorator="['orderBy',validatorRules.orderBy ]" />
      </a-form-item>
      <a-form-item label="扩展字段a">
        <a-input v-decorator="['extA',validatorRules.extA ]" />
      </a-form-item>
      <a-form-item label="扩展字段b">
        <a-input v-decorator="['extB',validatorRules.extB ]" />

      </a-form-item>
      <a-form-item label="状态">
        <a-switch v-decorator="['enable', { valuePropName: 'checked' }]" />

      </a-form-item>
    </a-form>
  </a-spin>
</template>

<script>
import pick from 'lodash.pick'
import { httpGet, httpPost, httpDelete, httpPut, downFile } from '@/utils/httpClient'

// 表单字段
// const fields = ['id', 'dictCode', 'dictType', 'dictValue', 'orderBy']
const fields = ['id', 'dictCode', 'code', 'value', 'parentDictValueCode', 'orderBy', 'extA', 'extB', 'enable']

export default {
  props: {
    // visible: {
    //   type: Boolean,
    //   required: true
    // },
    // loading: {
    //   type: Boolean,
    //   default: () => false
    // },
    // model: {
    //   type: Object,
    //   default: () => null
    // }
  },
  data () {
    return {
      model: {},
      loading: false,
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
      validatorRules: {
        dictCode: { rules: [{ required: false }, { validator: this.validateDictCode }] },
        code: { rules: [{ required: false }, { validator: this.validateCode }] },
        value: { rules: [{ required: false }, { validator: this.validateValue }] },
        parentDictValueCode: { rules: [{ required: false }, { validator: this.validateParentDictValueCode }] },
        orderBy: { rules: [{ required: false }, { validator: this.validateOrderBy }] },
        extA: { rules: [{ required: false }, { validator: this.validateExtA }] },
        extB: { rules: [{ required: false }, { validator: this.validateExtB }] },
        enable: { rules: [{ required: false }, { validator: this.validateEnable }] }
      },
      urls: {
        add: '',
        edit: ''
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
    // this.$watch('model', () => {
    //   console.log('model change', this.model)
    //   this.model && this.form.setFieldsValue(pick(this.model, fields))
    // })
  },
  mounted () {
    // vue 生命周期钩子，已完成模板渲染，此处可以进行dom操作
  },
  methods: {
    handleChange () {
      console.log(arguments)
    },
    add () {
      this.edit({})
    },
    edit (record) {
      console.log('edit::', this.record)
      this.model = Object.assign({}, record)

      this.form.resetFields()
      this.$nextTick(() => {
        this.model && this.form.setFieldsValue(pick(this.model, fields))
      })
    },

    submit () {
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          const formData = Object.assign(this.model, values)

          let httpRequest = null
          if (!this.model.id) {
            httpRequest = httpPost(this.urls.add, formData)
          } else {
            httpRequest = httpPut(this.urls.edit, formData)
          }
          console.log('表单提交数据', formData)
          httpRequest
            .then(
              (res) => {
                if (res.success) {
                  this.$message.success(res.message)
                  this.$emit('ok')
                } else {
                  this.$message.warning(res.message)
                }
              },
              (err, con) => {
                this.$message.warning('保存失败！')
                console.log(err, con)
              }
            )
            .finally(() => {
              this.loading = false
            })
        }
      })
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
    validateDictCode (rule, value, callback) {
      callback()
      // callback(请输入正确的字典编码)
    },
    validateCode (rule, value, callback) {
      callback()
      // callback(请输入正确的字典值编码)
    },
    validateValue (rule, value, callback) {
      callback()
      // callback(请输入正确的字典值)
    },
    validateParentDictValueCode (rule, value, callback) {
      callback()
      // callback(请输入正确的父字典值编码)
    },
    validateOrderBy (rule, value, callback) {
      callback()
      // callback(请输入正确的排序)
    },
    validateExtA (rule, value, callback) {
      callback()
      // callback(请输入正确的扩展字段a)
    },
    validateExtB (rule, value, callback) {
      callback()
      // callback(请输入正确的扩展字段b)
    },
    validateEnable (rule, value, callback) {
      callback()
      // callback(请输入正确的状态)
    }
  }
}
</script>
