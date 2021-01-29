<template>
  <a-col v-bind="defaultColSpan">
    <slot></slot>
  </a-col>
</template>

<script>
export default {
  name: 'FormItemWrapper',
  components: {},
  data () {
    return {
      defaultColSpan: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 8 },
        lg: { span: 8 },
        xl: { span: 6 },
        xxl: { span: 6 }
      }
    }
  },
    // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted () {

  },
  methods: {

  }
}
</script>
