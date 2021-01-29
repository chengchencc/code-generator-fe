<template>
  <div>
    <a-divider></a-divider>

    <a-table
      ref="table"
      bordered
      rowKey="code"
      size="small"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
      :loading="loading"
      :rowSelection="rowSelection"
      class="table-page-container-wrapper">
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
    </a-table>
    <a-divider></a-divider>
    <a-row>
      <a-col>
        <a-space>
          <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
          <a-button :loading="loading" type="primary" @click="nextStep">下一步</a-button>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { toDateTime } from '@/utils/datetime'
import { getTableInfos } from '../api'
export default {
  name: 'Step2',
  // inject: ['model'],
  props: {
    value: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      loading: false,
      dataSource: [],
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '表名',
          dataIndex: 'tableName'
        },
        {
          title: '备注',
          dataIndex: 'tableComment'
        },
        {
          title: '引擎',
          dataIndex: 'engine'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          customRender: toDateTime
        }
      ],
      /* table选中keys */
      selectedRowKeys: [],
      /* table选中records */
      selectionRows: []
    }
  },
  created () {
    // 初始化字典配置 在自己页面定义
    // this.initDictConfig()
  },
  mounted () {
    // this.tableHeight = document.body.clientHeight - 445
    console.log('=======================================step2')
    console.log('spep2::model::', this.value)
    this.loadData()
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    loadData () {
      // this.dataSource = [{ code: 'aaa', name: 'name' }]
      this.loading = true
      getTableInfos(this.value)
        .then((res) => {
          this.loading = false
          this.dataSource = res
        })
        .catch((err) => {
          this.$message.error('加载失败,请确认数据库连接是否正确！')
          this.loading = false
          console.error(err)
        })
    },
    nextStep () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warn('请选择一个表')
        return
      }
      const selectedTableNames = this.selectionRows.map((row) => {
        return row.tableName
      })
      this.$emit('nextStep', selectedTableNames)
    },
    prevStep () {
      this.$emit('prevStep')
    },
    onSelectChange (selectedRowKeys, selectionRows) {
      console.log('***************************')
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    },
    onClearSelected () {
      this.selectedRowKeys = []
      this.selectionRows = []
    }
  },

  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
.stepFormText {
  margin-bottom: 24px;

  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }
}
</style>
