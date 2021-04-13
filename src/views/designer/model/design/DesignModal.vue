<template>
  <a-modal
    :title="title"
    :visible="visible"
    :confirmLoading="confirmLoading"
    okText="保存"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    :destroyOnClose="true"
    wrapClassName="ant-modal-cust-warp"
    dialogClass="full-screen-modal model-design-modal">
    <a-spin :spinning="confirmLoading">
      <a-card>
        <a-button type="button" @click="handleGenerator">生成代码</a-button>
        <!-- <div>
          <a-button type="primary" @click="handleOk">保存</a-button>
        </div> -->
        <!-- 实体配置 -->
        <a-divider>模型配置</a-divider>
        <main-form :model="model" ref="mainForm"></main-form>
        <a-divider>字段配置</a-divider>
        <a-tabs default-active-key="1" type="card">
          <!-- 字段信息 -->
          <a-tab-pane key="1" tab="字段属性">
            <field-config ref="fieldConfig" :value="model.fields"></field-config>
          </a-tab-pane>
          <!-- 显示配置 -->
          <a-tab-pane key="2" tab="显示属性" force-render>
            <ui-config ref="uiConfig" :value="addDefaultValue(model.fieldUIs)"></ui-config>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-spin>
  </a-modal>

</template>

<script>
import MainForm from './MainForm'
import FieldConfig from './FieldConfig'
import UiConfig from './UiConfig'
import { saveDataModel } from '../api'
import { downFile } from '@/utils/httpClient'

export default {
  name: 'DesignModal',
  components: {
    MainForm,
    FieldConfig,
    UiConfig
  },
  data () {
    return {
      title: '操作',
      visible: false,
      confirmLoading: false,
      model: {}
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted () {},
  computed: {},
  methods: {
    addDefaultValue (data) {
      if(!data){
        return data
      }
      data.forEach((item) => {
        item.formColWidth = item.formColWidth || '12'
      })
      return data
    },
    add () {
      this.edit({})
    },
    edit (record) {
      this.model = Object.assign({}, record)

      console.log('model::fields::', this.model.fields)

      const fieldUIs = this.model.fields.map((item) => {
        const { tableFieldName, name, dataFieldUI } = item
        const ui = dataFieldUI || {}
        ui.tableFieldName = tableFieldName
        ui.name = name
        return ui
      })
      console.log('model::fieldUIs::', fieldUIs)
      this.model.fieldUIs = fieldUIs
      this.visible = true

      // this.$nextTick(() => {
      //   this.form.setFieldsValue(pick(this.model, 'roleName', 'remark', 'roleCode'))
      // })
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleOk () {
      const mainFormData = this.$refs.mainForm.getSaveData()
      console.log('DesignModal::handleOK::mainFormData::', mainFormData)
      const fieldData = this.$refs.fieldConfig.getSaveData()
      console.log('DesignModal::handleOK::fieldData::', fieldData)
      const uiData = this.$refs.uiConfig.getSaveData()
      console.log('DesignModal::handleOK::uiData::', uiData)

      if (mainFormData && fieldData && uiData) {
        const params = {
          dataEntity: mainFormData,
          dataFields: fieldData,
          dataFieldUI: uiData
        }
        console.log('DesignModal::handleOK::params::', params)
        saveDataModel(params).then((res) => {
          this.$message.success('保存成功！')
          // this.visible = false
          this.$emit('ok')
        })
      }
      // const that = this
      // 触发表单验证
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     that.confirmLoading = true
      //     const formData = Object.assign(this.model, values)
      //     let obj
      //     console.log(formData)
      //     if (!this.model.id) {
      //       // obj = addRole(formData)
      //     } else {
      //       // obj = editRole(formData)
      //     }
      //     obj
      //       .then((res) => {
      //         if (res.code == 200) {
      //           that.$message.success(res.remark)
      //           that.$emit('ok')
      //           that.close()
      //         } else {
      //           that.$message.warning(res.remark)
      //         }
      //       })
      //       .finally(() => {
      //         that.confirmLoading = false
      //         // that.close();
      //       })
      //   }
      // })
    },
    handleGenerator () {
      downFile(`/api-test/generator/exportToZip`, { entityId: this.model.id }).then((data) => {
        this.$message.success('已生成！')
        // if (!data) {
        //   this.$message.warning('文件下载失败')
        //   return
        // }
        // if (typeof window.navigator.msSaveBlob !== 'undefined') {
        //   window.navigator.msSaveBlob(new Blob([data]), 'code.zip')
        // } else {
        //   const url = window.URL.createObjectURL(new Blob([data]))
        //   const link = document.createElement('a')
        //   link.style.display = 'none'
        //   link.href = url
        //   link.setAttribute('download', 'code.zip')
        //   document.body.appendChild(link)
        //   link.click()
        //   document.body.removeChild(link) // 下载完成移除元素
        //   window.URL.revokeObjectURL(url) // 释放掉blob对象
        // }
      })
    },
    handleCancel () {
      this.close()
    }
  }
}
</script>

<style lang="less">
.model-design-modal .ant-card-body {
  background-color: #fafafa;
}
</style>
