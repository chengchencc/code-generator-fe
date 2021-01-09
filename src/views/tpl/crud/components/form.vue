<template>
  <a-modal
    title="新建规则"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="
      () => {
        $emit('ok')
      }
    "
    @cancel="
      () => {
        $emit('cancel')
      }
    ">
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="字典编号">
          <a-input
            v-decorator="[
              'dictCode',
              { rules: [{ required: true, min: 5, message: '请输入至少五个字符的规则描述！' }] }
            ]" />
        </a-form-item>
        <!-- <a-form-item label="字典类型">
          <a-input v-decorator="['dictType',validatorRules.dictCode ]" />
        </a-form-item> -->
        <a-form-item label="字典值">
          <a-input
            v-decorator="[
              'dictValue',
              { rules: [{ required: true, message: '请输入至少五个字符的规则描述！' },{ validator: validateUserName }] }
            ]" />
        </a-form-item>
        <a-form-item label="排序号">
          <a-input
            v-decorator="[
              'orderBy',
              { rules: [{ required: true, min: 5, message: '请输入至少五个字符的规则描述！' }] }
            ]" />
        </a-form-item>
        <a-form-item label="描述">
          <a-input
            v-decorator="[
              'description',
              { rules: [{ required: true, min: 5, message: '请输入至少五个字符的规则描述！' }] }
            ]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'dictCode', 'dictType', 'dictValue', 'orderBy']

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
      // form: this.$form.createForm(this),
      validatorRules: {
        dictCode: {
          rules: [
            {
              required: true,
              message: '请输入用户账号!'
            },
            {
              validator: this.validateUsername
            }
          ]
        }
      }
    }
  },
  beforeCreate () {
  },
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

  },
  methods: {
    validateUserName (rule, value, callback) {
      // console.log('aaaa', rule, value, callback)
      // eslint-disable-next-line standard/no-callback-literal
      callback('aaaaaa')
      // if (!value || new RegExp(/^1[3|4|5|7|8][0-9]\d{8}$/).test(value)) {
      //   callback()
      // } else {
      //   // eslint-disable-next-line standard/no-callback-literal
      //   callback('请输入正确格式的手机号码!')
      // }
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
    }
  }
}
</script>
