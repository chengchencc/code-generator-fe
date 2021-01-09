<template>
  <page-header-wrapper title="示例流程">
    <!-- 顶部按钮部分 -->
    <template slot="extra">
      <space>
        <a-button v-for="(value, name) in formSchema.functions" :key="name" type="primary" @click="handleClick(name)">
          {{ value }}
        </a-button>
      </space>
    </template>
    <!-- 左侧表单菜单以及右侧具体菜单 -->
    <div>
      <div class="form-container">
        <a-menu v-model="formSchema.currentTab">
          <a-menu-item :key="name" v-for="(value, name) in formSchema.tabs">
            <!-- 自己实现菜单左侧的图标 -->
            <!-- <card-icon :tabStatus="value.tabStatus" /> -->
            {{ value.tabName }}
          </a-menu-item>
        </a-menu>
        <keep-alive>
          <component
            style="width: 100%; height: calc(100vh - 210px); overflow: auto"
            :is="formSchema.currentTab[0]"
            :formSchema="formSchema"
          />
        </keep-alive>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import WangEditor from '@/components/Editor/WangEditor'
import QuillEditor from '@/components/Editor/QuillEditor'
export default {
  name: 'FormLayout',
  components: {
    WangEditor,
    QuillEditor
  },
  props: {
    formSchema: {
      type: Object,
      default: ()=>{
        return {
        tabs: {
          'wang-editor': {
            tabName: '编辑器1',
            tabStatus: 1
          },
          'quill-editor': {
            tabName: '编辑器2',
            tabStatus: 1
          }
        },
        functions: { 'Pass': '通过' },
        currentTab: ['wang-editor']
      }
    }}
  },
}
</script>

<style lang="less" scoped>
.form-container {
  display: flex;
  justify-content: space-between;
}
</style>