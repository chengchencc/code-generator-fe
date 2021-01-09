<template>
  <page-header-wrapper :title="true" content="对于复杂的表单页面，适合将表单分离到一个单独的页面中。">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
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
          <a-form-item
            label="扩展字段a"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-input v-decorator="['extA',validatorRules.extA ]" />
          </a-form-item>
          <a-form-item label="扩展字段b">
            <a-input v-decorator="['extB',validatorRules.extB ]" />
          </a-form-item>
          <a-form-item label="状态">
            <a-switch v-decorator="['enable', { valuePropName: 'checked' }]" />
          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
            <a-button htmlType="submit" type="primary" @click="handleSubmit" :loading="confirmLoading">保存</a-button>
            <a-button style="margin-left: 8px" @click="handleCancle">取消</a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import pick from 'lodash.pick'
import { getList, findById, save, deleteItem } from './api'

// 表单字段
const fields = ['id', 'dictCode', 'code', 'value', 'parentDictValueCode', 'orderBy', 'extA', 'extB', 'enable']

export default {
  props: {},
  data () {
    return {
      // 表单公共布局，在单独 a-from-item 中可以进行个性化配置
      formLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        }
      },
      // 保存按钮加载控制
      confirmLoading: false,
      // 数据加载中
      loading: false,
      id: '',
      // 数据
      model: {},
      // 校验规则
      validatorRules: {
        dictCode: { rules: [{ required: false }, { validator: this.validateDictCode }] },
        code: { rules: [{ required: false }, { validator: this.validateCode }] },
        value: { rules: [{ required: false }, { validator: this.validateValue }] },
        parentDictValueCode: { rules: [{ required: false }, { validator: this.validateParentDictValueCode }] },
        orderBy: { rules: [{ required: false }, { validator: this.validateOrderBy }] },
        extA: { rules: [{ required: false }, { validator: this.validateExtA }] },
        extB: { rules: [{ required: false }, { validator: this.validateExtB }] },
        enable: { rules: [{ required: false }, { validator: this.validateEnable }] }
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
    // 初次加载数据
    this.id = this.$route.query.id
    // id 有值的话为编辑，无值则为新增
    if (this.id) {
      findById(this.id)
        .then((res) => {
          this.model = res.datas
        })
        .catch((e) => {
          this.$message.error('获取数据失败')
        })
    } else {
      this.model = null
    }
  },
  methods: {
    loadData () {},
    handleSubmit () {
      this.confirmLoading = true
      this.form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          save(values)
            .then((res) => {
              this.$message.info('修改成功')
              // 跳转到列表页面
              this.goback()
            })
            .catch((e) => {
              // 保存失败
              // 触发加载动画
              this.confirmLoading = false
              this.$message.error('保存失败')
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancle () {
      this.goback()
    },
    /** 返回到上一页 */
    goback () {
      this.$router.go(-1)
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
