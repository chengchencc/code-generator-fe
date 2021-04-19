<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 搜索过滤区域 -->
      <div class="table-page-search-wrapper">
        <!--<a-form layout="inline">
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
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>-->

      </div>
      <!-- 功能按钮区域 -->
      <div class="table-operator">
        <!-- <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button> -->
        <a-button type="primary" icon="reload" @click="searchQuery">刷新</a-button>
        <a-button type="default" icon="import" @click="handleImportData">导入</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <!-- <a-menu-item key="1">
              <a-icon type="delete" />删除
            </a-menu-item> -->
            <a-menu-item key="1" @click="handleDownloadCodeBatch">
              <a-icon type="import" />下载代码
            </a-menu-item>
            <!-- <a-button type="default" icon="import" @click="handleDownloadCode">下载代码</a-button> -->

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
      <!-- 表格内容区域 -->
      <table-wrapper>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
          <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{
            selectedRowKeys.length
          }}</a>项&nbsp;&nbsp;
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>
        <a-table ref="table"
                 bordered
                 :size="tableConfig.size"
                 rowKey="id"
                 :columns="columns"
                 :dataSource="dataSource"
                 :pagination="ipagination"
                 :loading="loading"
                 @change="handleTableChange"
                 :rowSelection="rowSelection"
                 class="table-page-container-wrapper">
          <!-- <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span> -->
          <span slot="status" slot-scope="text">
            <a-badge :status="text?'default':'success'" :text="text?'已发布':'未发布'" />
          </span>
          <!-- <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span> -->

          <span slot="action" slot-scope="text, record">
            <template>
              <!-- <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" /> -->
              <a @click="handleDesign(record)">设计</a>
              <!-- <a-divider type="vertical" /> -->
              <!-- <a-popconfirm title="删除后不能恢复，确定删除？" ok-text="是" cancel-text="否" @confirm="handleDelete(record)">
              <a>删除</a>
            </a-popconfirm> -->
              <a-divider type="vertical" />
              <a-dropdown>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a @click="handleDeploy(record)">发布</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="handleDownloadCode(record)">下载代码</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="handleDelete(record)">删除</a>
                    <!-- <a @click="handleDetail(record)">详情</a> -->
                  </a-menu-item>
                </a-menu>
                <a>更多
                  <a-icon type="down" />
                </a>
              </a-dropdown>
            </template>
          </span>
        </a-table>
      </table-wrapper>
      <!-- 嵌入表单区域 -->
      <design-modal ref="modalDesigner" @ok="searchQuery"></design-modal>

      <import-modal ref="modalImport" @ok="searchQuery"></import-modal>

      <!-- 表单详情 -->
      <!-- <detail-modal
        ref="detailModal"
        :visible="detailVisible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleDetailCancel" /> -->
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { deleteItem, findPageList, exportBatchToZip } from './api'

import { TablePageMixin } from '@/core/mixins/TablePage2Mixin'
import ImportModal from './import/ImportModal.vue'
import DesignModal from './design/DesignModal.vue'
import { TableSchema, TableType } from './dictionary'
import { downFile } from '@/utils/httpClient'
import { TableWrapper } from '@/components'

export default {
  name: 'TableList',
  mixins: [TablePageMixin, TableWrapper],

  components: {
    DesignModal,
    ImportModal
  },
  data () {
    return {
      columns: [
        // {
        //   title: '#',
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '主键',
          dataIndex: 'id',
          ellipsis: false, // 超过宽度将自动省略
          align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
          width: '200px'
        },
        {
          title: '表名',
          dataIndex: 'tableName',
          ellipsis: false, // 超过宽度将自动省略
          align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
          width: '200px'
        },
        {
          title: '模型编号',
          dataIndex: 'code',
          ellipsis: false, // 超过宽度将自动省略
          align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
          width: '200px'
        },
        {
          title: '模型名称',
          dataIndex: 'name',
          ellipsis: false, // 超过宽度将自动省略
          align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
          width: '200px'
        },
        {
          title: '表结构',
          dataIndex: 'tableSchema',
          ellipsis: false, // 超过宽度将自动省略
          align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
          width: '200px',
          customRender: (value) => {
            return TableSchema[value] || value
          }
        },
        {
          title: '表类型',
          dataIndex: 'tableType',
          ellipsis: false, // 超过宽度将自动省略
          align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
          width: '200px',
          customRender: (value) => {
            return TableType[value] || value
          }
        },

        {
          title: '是否发布',
          dataIndex: 'isPublished',
          ellipsis: false, // 超过宽度将自动省略
          align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
          width: '200px',
          // customRender: (value) => (value ? '是' : '否')
          scopedSlots: { customRender: 'status' }
        },
        // {
        //   title: '存储方式',
        //   dataIndex: 'storageType',
        //   ellipsis: false, // 超过宽度将自动省略
        //   align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
        //   width: '200px'
        // },
        {
          title: '版本',
          dataIndex: 'version',
          ellipsis: false, // 超过宽度将自动省略
          align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
          width: '200px',
          customRender: (value) => {
            return `v${value}`
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '200px',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  filters: {},
  created () {
    // 此处可以进行表单中的一些字典的初始化
    // getRoleList({ t: new Date() })
  },
  computed: {},
  methods: {
    loadData () {
      const requestParameters = this.getQueryParams()
      console.log('loadData request parameters:', requestParameters)
      findPageList(requestParameters).then((res) => {
        this.dataSource = res.items
        this.ipagination.total = res.total
      })
    },

    handleDesign (record) {
      // this.$router.push({ path: '/designer/ModelDesigner' })
      console.log('aaaaaaaaaaaaa')
      this.$refs.modalDesigner.edit(record)
      this.$refs.modalDesigner.title = '设计'
    },

    handleImportData () {
      this.$refs.modalImport.add()
    },

    /** 单条业务删除 */
    handleDelete (record) {
      deleteItem({ id: record.id })
        .then((res) => {
          this.refresh()
          this.$message.info('删除成功')
        })
        .catch((e) => {
          console.error(e)
          this.$message.error('删除失败')
        })
    },
    handleDownloadCode (record) {
      console.log(record)
      downFile(`/api-grt/generator/exportToZip`, { entityId: record.id }).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data]), 'code.zip')
        } else {
          const url = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'code.zip')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      })
    },
    handleDownloadCodeBatch () {
      // console.log(record)

      console.log(this.selectionRows)
      console.log(this.selectedRowKeys)
      const ids = this.selectedRowKeys
      console.log(ids)
      this.$message.info('正在生成代码，请耐心等待...')

      exportBatchToZip(ids).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data]), 'code.zip')
        } else {
          const url = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'code.zip')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      })
    }
  }
}
</script>
