<template>
  <a-drawer :title="title"
            :width="width"
            :visible="visible"
            :confirmLoading="loading"
            :closable="true"
            :keyboard="true"
            @ok="handleOk"
            @cancel="handleCancel">
    <real-form ref="realForm" @ok="submitCallback"></real-form>
    <div class="drawer-footer">
      <a-button style="marginRight: 8px" @click="onClose">
        Cancel
      </a-button>
      <a-button type="primary" @click="onClose">
        Submit
      </a-button>
    </div>
    </div>
  </a-drawer>
</template>

<script>
import RealForm from './SysDeptForm'

export default {
  components: {
    RealForm
  },
  props: {},
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
      this.$refs.realForm.submit()
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
<style lang="less" scoped>
.drawer-footer {
  position: 'absolute';
  bottom: 0;
  width: '100%';
  border-top: '1px solid #e8e8e8';
  padding: '10px 16px';
  text-align: 'right';
  left: 0;
  background: '#fff';
  border-radius: '0 0 4px 4px';
}
</style>
