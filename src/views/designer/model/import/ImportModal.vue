<template>
  <a-modal
    :title="title"
    :visible="visible"
    :width="700"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :footer="null"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">

      <a-card :bordered="false">
        <a-steps class="steps" :current="currentTab">
          <a-step title="选择数据源" />
          <a-step title="选择数据表" />
          <a-step title="完成" />
        </a-steps>
        <div class="content">
          <step1 v-if="currentTab === 0" @nextStep="nextStep" />
          <step2 v-if="currentTab === 1" :value="model" @nextStep="nextStep2" @prevStep="prevStep" />
          <step3 v-if="currentTab === 2" :value="model" @prevStep="prevStep" @finish="finish" />
        </div>
      </a-card>

    </a-spin>
  </a-modal>

</template>

<script>
import pick from 'lodash.pick'
import Step1 from './step1.vue'
import Step2 from './step2.vue'
import Step3 from './step3.vue'

export default {
  name: 'ImportModal',
  components: { Step1, Step2, Step3 },

  data () {
    return {
      title: '从数据库导入',
      visible: false,
      model: {},
      currentTab: 0,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        roleName: { rules: [{ required: true, message: '请输入角色名称!' }] },
        roleCode: {
          rules: [{ required: true, message: '请输入角色名称!' }, { validator: this.validateRoleCode }]
        }
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted () {},
  computed: {},
  methods: {
    // handler
    nextStep (dto) {
      this.model = dto
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
        // handler
    nextStep2 (tableNames) {
      this.model.tableNames = tableNames
      console.log('nextStep2::', this.model)
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
      this.close()
    },
    add () {
      this.edit({})
    },
    edit (record) {
      // this.form.resetFields()
      // this.model = Object.assign({}, record)
      this.visible = true

      this.$nextTick(() => {
        // this.form.setFieldsValue(pick(this.model, 'roleName', 'remark', 'roleCode'))
      })
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleOk () {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const formData = Object.assign(this.model, values)
          let obj
          console.log(formData)
          if (!this.model.id) {
            // obj = addRole(formData)
          } else {
            // obj = editRole(formData)
          }
          obj
            .then((res) => {
              if (res.code == 200) {
                that.$message.success(res.remark)
                that.$emit('ok')
                that.close()
              } else {
                that.$message.warning(res.remark)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              // that.close();
            })
        }
      })
    },
    handleCancel () {
      this.close()
    }
  }
}
</script>

<style lang="less">
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>
