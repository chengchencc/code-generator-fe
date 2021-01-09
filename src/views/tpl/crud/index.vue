<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 搜索过滤 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="规则编号">
                <a-input v-model="queryParam.id" placeholder="" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="调用次数">
                  <a-input-number v-model="queryParam.callNo" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="更新日期">
                  <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="使用状态">
                  <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="使用状态">
                  <a-select placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 功能按钮 -->
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1">
              <a-icon type="delete" />删除
            </a-menu-item>
            <!-- lock | unlock -->
            <!-- <a-menu-item key="2">
              <a-icon type="lock" />锁定
            </a-menu-item> -->
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <!-- 表格内容 -->
      <s-table
        ref="table"
        size="middle"
        rowKey="dictId"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <!-- <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span> -->
        <!-- <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span> -->

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <!-- <a @click="handleSub(record)">配置</a> -->
            <a @click="handleDelete(record)">删除</a>
            <!-- <a-divider type="vertical" />
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="handleEdit(record)">编辑</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="handleDelete(record)">删除</a>
                </a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown> -->
          </template>
        </span>
      </s-table>
      <!-- 嵌入表单 -->
      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk" />
      <!-- <step-by-step-modal ref="modal" @ok="handleOk" /> -->
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'

import { getList, findById, save, deleteItem } from '@/api/api'

import CreateForm from './components/form'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '字典编号',
    dataIndex: 'dictCode'
  },
  {
    title: '字典类型',
    dataIndex: 'dictType'
  },
  {
    title: '字典值',
    dataIndex: 'dictValue'
  },
  {
    title: '排序号',
    dataIndex: 'orderBy'
  },
  {
    title: '创建者',
    dataIndex: 'creator'
  },
  {
    title: '修改者',
    dataIndex: 'updator'
  },
  // {
  //   title: '描述',
  //   dataIndex: 'description'
  //   // scopedSlots: { customRender: 'description' }
  // },
  // {
  //   title: '服务调用次数',
  //   dataIndex: 'callNo',
  //   sorter: true,
  //   needTotal: true,
  //   customRender: (text) => text + ' 次'
  // },
  // {
  //   title: '状态',
  //   dataIndex: 'status'
  //   // scopedSlots: { customRender: 'status' }
  // },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    sorter: true
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '200px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm
  },
  data () {
    return {
      columns: columns,
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        // TODO:sss
        return getList(requestParameters).then((res) => {
          console.log(res)
          const totalPage = parseInt(res.count / requestParameters.pageSize) + 1
          var result = {
            pageSize: requestParameters.pageSize,
            pageNo: requestParameters.pageNo,
            totalCount: res.count,
            totalPage: totalPage,
            data: res.data
          }
          console.log(result)
          return result
        })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    // 此处可以进行表单中字典的初始化
    // getRoleList({ t: new Date() })
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
    /** 触发新增 */
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    /** 触发编辑 */
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    /** 单条业务删除 */
    handleDelete (record) {
      // this.$axio.delete()
      deleteItem(record.id)
        .then((res) => {
          this.$message.info('删除成功')
        })
        .catch((e) => {
          this.$message.error('删除失败')
        })
    },
    /** 表单保存 */
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)

          save(values)
            .then((res) => {
              // 关闭新增、编辑的窗口
              this.visible = false
              // 触发加载动画
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
            .catch((e) => {
              // 保存失败
              this.$message.error('保存失败')
            })
          // if (values.id) {
          //   // 修改 e.g.
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       resolve()
          //     }, 1000)
          //   }).then((res) => {
          //     // 关闭新增、编辑的窗口
          //     this.visible = false
          //     // 触发加载动画
          //     this.confirmLoading = false
          //     // 重置表单数据
          //     form.resetFields()
          //     // 刷新表格
          //     this.$refs.table.refresh()

          //     this.$message.info('修改成功')
          //   })
          // } else {
          //   // 新增
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       resolve()
          //     }, 1000)
          //   }).then((res) => {
          //     this.visible = false
          //     this.confirmLoading = false
          //     // 重置表单数据
          //     form.resetFields()
          //     // 刷新表格
          //     this.$refs.table.refresh()

          //     this.$message.info('新增成功')
          //   })
          // }
        } else {
          this.confirmLoading = false
        }
      })
    },
    /** 表单填写过程中取消 */
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleMenuClick () {
      this.$message.info('删除成功')
    },
    // handleSub (record) {
    //   this.$refs.modal.edit()
    //   if (record.status !== 0) {
    //     this.$message.info(`${record.no} 订阅成功`)
    //   } else {
    //     this.$message.error(`${record.no} 订阅失败，规则已关闭`)
    //   }
    // },
    /** 当表格中行选中执行 */
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    /** 切换高级搜索模式 */
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    /** 重置表单搜索表单项 */
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
