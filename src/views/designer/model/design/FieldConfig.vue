<template>
  <a-table :columns="columns" :dataSource="dataSource" size="small" rowKey="id" :pagination="false">
    <template v-for="c in controls" :slot="c.dataIndex" slot-scope="text, record, index">
      <dynamic-form-item
        :key="c.dataIndex"
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

export const FieldType = [
  { value: 'INTETER', name: '整型' },
  { value: 'STRING', name: '字符型' },
  { value: 'BOOLEAN', name: '布尔型' },
  { value: 'DATETIME', name: '日期时间' },
  { value: 'DECIMAL', name: '小数' },
  { value: 'Double', name: '双精度' }
]

export default {
  name: 'FieldConfig',
  components: {
    DynamicFormItem
  },
  data () {
    return {
      columns: [
        {
          title: '字段编码',
          dataIndex: 'tableFieldName',
          control: ControlType.InputText,
          scopedSlots: { customRender: 'tableFieldName' }
        },
        {
          title: '字段名称',
          dataIndex: 'name',
          control: ControlType.InputText,
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '字段描述',
          dataIndex: 'description',
          control: ControlType.InputText,
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '字段类型',
          dataIndex: 'dataFieldType',
          control: ControlType.Select,
          enums: FieldType,
          scopedSlots: { customRender: 'dataFieldType' }
        },
        {
          title: '字段长度',
          dataIndex: 'length',
          control: ControlType.Number,
          scopedSlots: { customRender: 'length' }
        },
        {
          title: '是否主键',
          dataIndex: 'isPrimaryKey',
          control: ControlType.Boolean,
          scopedSlots: { customRender: 'isPrimaryKey' }
        },
        {
          title: '是否必须',
          dataIndex: 'isRequired',
          control: ControlType.Boolean,
          scopedSlots: { customRender: 'isRequired' }
        },
        {
          title: '默认值',
          dataIndex: 'defaultValue',
          control: ControlType.InputText,
          scopedSlots: { customRender: 'defaultValue' }
        },
        {
          title: '排序号',
          dataIndex: 'sortNo',
          control: ControlType.Number,
          scopedSlots: { customRender: 'sortNo' }
        },
        {
          title: '是否外键',
          dataIndex: 'isForeignKey',
          control: ControlType.Boolean,
          scopedSlots: { customRender: 'isForeignKey' }
        },
        {
          title: '关联表',
          dataIndex: 'joinTable',
          control: ControlType.InputText,
          scopedSlots: { customRender: 'joinTable' }
        },
        {
          title: '关联字段',
          dataIndex: 'joinField',
          control: ControlType.InputText,
          scopedSlots: { customRender: 'joinField' }
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
        dataFieldType: 'STRING',
        length: i,
        isPrimaryKey: false,
        isRequired: false,
        defaultValue: '',
        sortNo: i,
        isForeignKey: false
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

      console.log('datasource', this.dataSource)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
