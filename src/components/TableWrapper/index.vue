<template>
  <div class="table-wrapper">
    <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
      <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{
        selectedRowKeys.length
      }}</a
      >项&nbsp;&nbsp;
      <a style="margin-left: 24px" @click="onClearSelected">清空</a>
    </div> -->
    <slot></slot>
  </div>

</template>

<script>
export default {
  name: 'TableWrapper',
  components: {},
  data () {
    return {

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

<style lang="sass" scoped>
</style>
