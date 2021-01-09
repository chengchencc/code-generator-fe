<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-descriptions title="退款申请">
        <a-descriptions-item label="取货单号">{{ model.id }}</a-descriptions-item>
        <a-descriptions-item label="状态">已取货</a-descriptions-item>
        <a-descriptions-item label="销售单号">1234123421</a-descriptions-item>
        <a-descriptions-item label="子订单">3214321432</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px" />
      <a-descriptions title="用户信息">
        <a-descriptions-item label="用户姓名">付小小</a-descriptions-item>
        <a-descriptions-item label="联系电话">18100000000</a-descriptions-item>
        <a-descriptions-item label="常用快递">菜鸟仓储</a-descriptions-item>
        <a-descriptions-item label="取货地址">浙江省杭州市西湖区万塘路18号</a-descriptions-item>
        <a-descriptions-item label="备注"> 无</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import pick from 'lodash.pick'
// 表单字段
// const fields = ['id', 'dictCode', 'dictType', 'dictValue', 'orderBy']
const fields = ['id', 'dictCode', 'code', 'value', 'parentDictValueCode', 'orderBy', 'extA', 'extB', 'enable']

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
    return {
      title: '详情',
      columm: { xs: 8, sm: 8, md: 8, lg: 4 }
    }
  },
  beforeCreate () {},
  created () {
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

  }
}
</script>
