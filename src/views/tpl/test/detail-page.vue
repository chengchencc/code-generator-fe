<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-spin :spinning="loading">
        <a-descriptions v-show="this.model" title="数据字典值表">
          <a-descriptions-item label="字典编码">{{ dictCode }}</a-descriptions-item>
          <a-descriptions-item label="字典值编码">{{ code }}</a-descriptions-item>
          <a-descriptions-item label="字典值">{{ value }}</a-descriptions-item>
          <a-descriptions-item label="父字典值编码">{{ parentDictValueCode }}</a-descriptions-item>
          <a-descriptions-item label="排序">{{ orderBy }}</a-descriptions-item>
          <a-descriptions-item label="扩展字段a">{{ extA }}</a-descriptions-item>
          <a-descriptions-item label="扩展字段b">{{ extB }}</a-descriptions-item>
          <a-descriptions-item label="状态">{{ enable }}</a-descriptions-item>
        </a-descriptions>
      </a-spin>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import pick from 'lodash.pick'
import { getList, findById, save, deleteItem } from './api'

// 表单字段
// const fields = ['id', 'dictCode', 'dictType', 'dictValue', 'orderBy']
const fields = ['id', 'dictCode', 'code', 'value', 'parentDictValueCode', 'orderBy', 'extA', 'extB', 'enable']

export default {
  props: {},
  data () {
    return {
      // 数据加载中
      loading: false,
      id: '',
      // 数据
      model: {}
    }
  },
  beforeCreate () {},
  created () {
    console.log('custom modal created')
    this.form = this.$form.createForm(this)

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      console.log('model change', this.model)
      this.model && pick(this.model, fields)
    })
  },
  mounted () {
    // vue 生命周期钩子，已完成模板渲染，此处可以进行dom操作
    // 初次加载数据
    this.id = this.$route.query.id
    // id 有值的话为编辑，无值则为新增
    if (this.id) {
      this.loadData()
    } else {
      this.model = null
    }
  },
  methods: {
    loadData () {
      findById(this.id)
        .then((res) => {
          this.model = res.datas
        })
        .catch((e) => {
          this.$message.error('获取数据失败')
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
