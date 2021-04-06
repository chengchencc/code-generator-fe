<template>
  <a-modal
    :title="model? '编辑':'新建'"
    :width="800"
    :visible="visible"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel">
    <generator-rule-form ref="internalForm" @ok="submitCallback"></generator-rule-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import GeneratorRuleForm from './GeneratorRuleForm'

export default {
  components: {
    GeneratorRuleForm
  },
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
      title: 'title',
      width: 800,
      visible: false,
      loading: false,
      model: {}
    }
  },
  beforeCreate () {},
  created () {
    console.log('custom modal created')
  },
  mounted () {
    // vue 生命周期钩子，已完成模板渲染，此处可以进行dom操作
  },
  methods: {
    add () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.realForm.add()
      })
    },
    edit (record) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.realForm.edit(record)
      })
    },
    close () {
      this.$emit('cancel')
      this.visible = false
    },
    handleOk () {
      this.$refs.internalForm.submit()
    },
    handleCancel () {
      this.close()
    },
    submitCallback () {
      this.$emit('ok')
      this.visible = false
    }
  }
}
</script>
