<template>
  <a-table :columns="columns" :dataSource="value" size="small" rowKey="id" :pagination="false">
    <template v-for="c in controls" :slot="c.dataIndex" slot-scope="text, record, index">
      <dynamic-form-item :key="c.dataIndex"
                         :controlType="c.control"
                         :value="text"
                         :enums="c.enums"
                         :disabled="c.disabled || false"
                         @change="handleRowChanged($event,c.dataIndex,record,index)"></dynamic-form-item>
      <!-- <div v-if="col.control == ControlType.Action" :key="col.dataIndex">
        action
      </div> -->
    </template>

    <!-- <template v-for="item in columns" >
      <template v-if="item.control" :slot="item.dataIndex" slot-scope="text, record, index">
        <a-input :key="item.dataIndex" :value="text"></a-input>
      </template>
    </template> -->

    <!-- <template slot="age" slot-scope="text, record, index">
      <a-input :value="text"></a-input>
    </template>
    <template slot="address" slot-scope="text, record, index">
      <a-input :value="text"></a-input>
    </template> -->
  </a-table>

</template>

<script>
import DynamicFormItem, { ControlType } from '../component/DynamicFormItem.vue'
// import moment from 'moment'
import { FieldType } from './FieldConfig'

export default {
  name: 'UiConfig',
  components: {
    DynamicFormItem
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      columns: [
        // {
        //   title: '字段编码',
        //   dataIndex: 'tableFieldName',
        //   control: ControlType.InputText,
        //   disabled: true,
        //   scopedSlots: { customRender: 'tableFieldName' }
        // },
        {
          title: '字段名称',
          dataIndex: 'name',
          control: ControlType.InputText,
          disabled: true,
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '字段描述',
          dataIndex: 'description',
          control: ControlType.InputText,
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '控件类型',
          dataIndex: 'controlType',
          control: ControlType.Select,
          enums: [
            { value: 'InputText', name: '文本框' },
            { value: 'Number', name: '数字' },
            { value: 'Password', name: '密码' },
            { value: 'SelectOne', name: '下拉单选' },
            { value: 'SelectMany', name: '下拉多选' },
            { value: 'Checkbox', name: '多选' },
            { value: 'Radio', name: '单选' },
            /* { value: 'Switch', name: '开关' },  // 还缺少这个！！ */
            { value: 'Date', name: '日期组件' },
            { value: 'DateTime', name: '日期时间组件' },
            { value: 'Time', name: '时间组件' },
            { value: 'File', name: '文件上传' },
            { value: 'Image', name: '图片上传' },
            { value: 'TextArea', name: '多行文本' },
            { value: 'UserSelect', name: '用户选择组件' },
            { value: 'OrgSelect', name: '组织选择组件' },
            { value: 'RichText', name: '富文本' },
            { value: 'Region', name: '区域选择' },
            { value: 'TreeSelect', name: '树选择' },
            { value: 'Modal', name: '自定义弹框' }
          ],
          scopedSlots: { customRender: 'controlType' }
        },
        {
          title: '表单显示',
          dataIndex: 'formDisplay',
          control: ControlType.Boolean,
          enums: FieldType,
          scopedSlots: { customRender: 'formDisplay' }
        },
        {
          title: '列表页显示',
          dataIndex: 'listDisplay',
          control: ControlType.Boolean,
          scopedSlots: { customRender: 'listDisplay' }
        },
        {
          title: '是否排序字段',
          dataIndex: 'supportSort',
          control: ControlType.Boolean,
          scopedSlots: { customRender: 'supportSort' }
        },
        {
          title: '是否查询条件',
          dataIndex: 'query',
          control: ControlType.Boolean,
          scopedSlots: { customRender: 'query' }
        },
        {
          title: '是否excel导出',
          dataIndex: 'exportExcel',
          control: ControlType.Boolean,
          scopedSlots: { customRender: 'exportExcel' }
        },
        {
          title: '表格列宽',
          dataIndex: 'tableColWidth',
          control: ControlType.Number,
          scopedSlots: { customRender: 'tableColWidth' }
        },
        {
          title: '校验',
          dataIndex: 'validation',
          control: ControlType.Object,
          scopedSlots: { customRender: 'validation' }
        },
        {
          title: '字典编码',
          dataIndex: 'dictCode',
          control: ControlType.InputText,
          scopedSlots: { customRender: 'dictCode' }
        },
        {
          title: '字典值编码',
          dataIndex: 'dictType',
          control: ControlType.InputText,
          scopedSlots: { customRender: 'dictType' }
        }
      ],
      dataSource: []
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted () {
    for (let i = 0; i < 20; i++) {
      this.dataSource.push({
        id: i,
        tableFieldName: 'tablename' + i,
        name: 'name' + i,
        description: 'name' + i,
        controlType: 'InputText',
        length: i,
        isPrimaryKey: false,
        isRequired: false,
        defaultValue: '',
        sortNo: i,
        isForeignKey: false,
        validation: {
          max: 100,
          min: 0,
          required: true,
          classType: 'com.ludan.generator.entity.validation.NumberValidation'
        }
      })
    }
  },
  computed: {
    controls () {
      return this.columns.filter((s) => s.control !== ControlType.Action)
    }
  },
  methods: {
    handleRowChanged (event, fieldName, record, index) {
      // this.dataSource[]
      record[fieldName] = event
      console.log(event, fieldName, record, index)

      console.log('uiConfig::values', this.value)
    },
    getSaveData () {
      return this.value
    }
  }
}
</script>

<style lang="less" scoped>
</style>
