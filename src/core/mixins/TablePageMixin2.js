/**
 * 新增修改完成调用 modalFormOk方法 编辑弹框组件ref定义为modalForm
 * data中url定义 list为查询列表  delete为删除单条记录  deleteBatch为批量删除
 * @example
 * <a-table
 *   ref="table"
 *   bordered
 *   size="default"
 *   rowKey="id"
 *   :columns="columns"
 *   :dataSource="dataSource"
 *   :pagination="ipagination"
 *   :loading="loading"
 *   :scroll="{ x: 2150, y:tableHeight }"
 *   @change="handleTableChange"
 *   :rowSelection="rowSelection"
 *   class="table-page-container-wrapper">
 *   <span slot="serial" slot-scope="text, record, index">
 *     {{ index + 1 }}
 *   </span>
 *   <span slot="status" slot-scope="text">
 *     <a-tag color="orange">{{ dictCodeVaue.projectStatus[text] || text }}</a-tag>
 *   </span>
 *   <span slot="action" slot-scope="text, record">
 *     <template>
 *       <a-dropdown>
 *         <a-menu slot="overlay">
 *           <a-menu-item key="1" type="primary" v-if="record.status == '01'">
 *             <router-link :to="{ path: `/project/detail/report/${record.id}/task` }">编辑</router-link>
 *           </a-menu-item>
 *           <a-menu-item key="6">
 *             <router-link :to="{ path: `/project/degree/${record.wfInstId}` }">查看审批记录</router-link>
 *           </a-menu-item>
 *           <a-menu-item key="7" @click="shwoImgM(record)" v-if="record.status != '01'">
 *             流程图
 *             <!-- <router-link :to="{path:`/project/degree/${record.wfInstId}`}">查看审批记录</router-link> -->
 *           </a-menu-item>
 *         </a-menu>
 *         <a-button type="primary" style="margin-left: 8px">
 *           更多
 *           <a-icon type="down" />
 *         </a-button>
 *       </a-dropdown>
 *     </template>
 *   </span>
 * </a-table>
 */
import { filterObj } from '@/utils/objectUtil'
import { httpGet, httpPost, httpDelete, httpPut, downFile } from '@/utils/httpClient'
import { TypeHelper } from '@/utils/typehelper'
import { TableWrapper } from '@/components'

// import Vue from 'vue'
// import { ACCESS_TOKEN } from '@/store/mutation-types'

export const TablePageMixin = {
  // mixins: [dictMixin],
  components: {
    TableWrapper
  },
  data () {
    return {
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      dataSource: [],
      /** table 默认配置 */
      tableConfig: {
        size: 'middle'
      },
      /* 分页参数 */
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '50'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      /* 排序参数 */
      isorter: {
        column: 'createTime',
        order: 'desc'
      },
      /* 筛选参数 */
      filters: {},
      /* table加载状态 */
      loading: false,
      /* table选中keys */
      selectedRowKeys: [],
      /* table选中records */
      selectionRows: [],
      /* 高级搜索 展开/关闭 */
      advanced: false
    }
  },
  created () {
    this.loadData()
    // 初始化字典配置 在自己页面定义
    this.initDictConfig()
  },
  mounted () {
    // this.tableHeight = document.body.clientHeight - 445
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
    loadData (arg) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      // 加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()// 查询条件
      this.loading = true
      httpGet(this.url.list, params).then((res) => {
        if (res.code === 0) {
          this.dataSource = res.data
          this.ipagination.total = res.count
        }
        this.loading = false
      })
    },
    initDictConfig () {
      console.log('--这是一个假的方法!')
    },
    getQueryParams () {
      // 获取查询条件
      const sqp = {}

      // trim查询条件
      const trimmedQueryParam = {}
      for (const key in this.queryParam) {
        if (Object.hasOwnProperty.call(this.queryParam, key)) {
          const item = this.queryParam[key]

          trimmedQueryParam[key] = item
          if (TypeHelper.isString(item)) {
            console.log('=====================', item)
            trimmedQueryParam[key] = item.trim()
          }
          // }
        }
      }

      var param = Object.assign(sqp, trimmedQueryParam, this.isorter, this.filters)
      console.log(param)
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize

      return filterObj(param)
    },
    getQueryField () {
      // TODO 字段权限控制
      var str = 'id,'
      this.columns.forEach(function (value) {
        str += ',' + value.dataIndex
      })
      return str
    },

    onSelectChange (selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    },
    onClearSelected () {
      this.selectedRowKeys = []
      this.selectionRows = []
    },
    searchQuery () {
      this.loadData(1)
    },
    resetSearchForm () {
      this.queryParam = {}
      this.loadData(1)
    },
    refresh () {
      this.loadData()
    },
    /** 切换到高级查询 */
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    /** 批量删除 */
    handleBatchDel: function () {
      if (!this.url.deleteBatch) {
        this.$message.error('请设置url.deleteBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
      } else {
        var ids = []
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids.push(this.selectedRowKeys[a])
        }
        var that = this
        this.$confirm({
          title: '确认删除',
          content: '是否删除选中数据?',
          onOk: function () {
            httpDelete(that.url.deleteBatch, ids).then((res) => {
              if (res.code === 200) {
                that.$message.success(res.remark)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.remark)
              }
            })
          }
        })
      }
    },
    /** 删除 */
    handleDelete: function (id) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      httpDelete(that.url.delete, { id: id }).then((res) => {
        if (res.code == 200) {
          that.$message.success(res.remark)
          that.loadData()
        } else {
          that.$message.warning(res.remark)
        }
      })
    },
    /** 编辑 */
    handleEdit: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
    },
    /** 新增 */
    handleAdd: function () {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
    },
    /** 重新加载数据 */
    handleTableChange (pagination, filters, sorter) {
      // 分页、排序、筛选变化时触发
      // TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = sorter.order === 'ascend' ? 'asc' : 'desc'
      }
      this.ipagination = pagination
      this.loadData()
    },

    handleOk () {
      // 新增/修改 成功时，重载列表
      this.loadData()
    },
    handleCancel () {
      // // 新增/修改 成功时，重载列表
      // this.loadData()
    },
    handleDetail: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '详情'
      this.$refs.modalForm.disableSubmit = true
    },
    /* 导出 */
    // handleExportXls2 () {
    //   const paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
    //   const url = `${window._CONFIG['domianURL']}/${this.url.exportXlsUrl}?paramsStr=${paramsStr}`
    //   window.location.href = url
    // },
    handleExportXls (fileName) {
      if (!fileName || typeof fileName !== 'string') {
        fileName = '导出文件'
      }
      const param = this.getQueryParams() // { ...this.queryParam }
      if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
        param['selections'] = this.selectedRowKeys.join(',')
      }
      console.log('导出参数', param)
      downFile(this.url.exportXlsUrl, param).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data]), fileName + '.xlsx')
        } else {
          const url = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName + '.xlsx')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      })
    },
    /* 导入 */
    handleImportExcel (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.success) {
          this.$message.success(`${info.file.name} 文件上传成功`)
          this.loadData()
        } else {
          this.$message.error(`${info.file.name} ${info.file.response.message}.`)
        }
      } else if (info.file.status === 'error') {
        this.$message.error(`文件上传失败: ${info.file.msg} `)
      }
    },
    /* 图片预览 */
    getImgView (text) {
      if (text && text.indexOf(',') > 0) {
        text = text.substring(0, text.indexOf(','))
      }
      // TODO:
      return ''
      // return window._CONFIG['imgServer'] + '/' + text
    },
    /* 文件上传 */
    uploadFile (text) {
      if (!text) {
        this.$message.warning('未知的文件')
        return
      }
      if (text.indexOf(',') > 0) {
        text = text.substring(0, text.indexOf(','))
      }
      // TODO:
      // window.open(window._CONFIG['domianURL'] + '/sys/common/download/' + text)
    }
  }

}
