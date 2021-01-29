<template>
  <a-popconfirm @confirm="handleChange">
    <span slot="icon" />
    <template slot="title">
      <a-card style="margin-left:-24px">
        <a-form layout="horizontal">
          <a-form-item label="必填">
            <a-checkbox v-model="value.required"></a-checkbox>
          </a-form-item>
          <a-form-item label="最大长度">
            <a-input v-model="value.max"></a-input>
          </a-form-item>
          <a-form-item label="最小长度">
            <a-input v-model="value.min"></a-input>
          </a-form-item>

        </a-form>
      </a-card>
    </template>
    <a href="#">设置</a>
  </a-popconfirm>

</template>

<script>
export default {
  name: 'ValidationComp',
  components: {},
  props: {
    value: {
      type: Object,
      default: function () {
        return {
          max: 100,
          min: 0,
          required: true,
          classType: 'com.ludan.generator.entity.validation.NumberValidation'
        }
      }
    }
  },
  data () {
    return {}
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted () {
    // console.log('props.value', this.value)
  },
  methods: {
    handleChange () {
      console.log('object change :: ', this.value)
      this.$emit('change', this.value)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
