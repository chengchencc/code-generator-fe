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
      <!-- 表格内容区域 -->
      <s-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        :bordered="true"
        showPagination="auto"
        :scroll="{ x: 1500, y: 300 }"
      >
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
            <a-popconfirm title="删除后不能恢复，确定删除？" ok-text="是" cancel-text="否" @confirm="handleDelete(record)">
              <a>删除</a>
            </a-popconfirm>
            <!-- <a-divider type="vertical" /> -->
            <!-- <a @click="handleDetail(record)">详情</a> -->
            <!-- <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="handleEdit(record)">编辑</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="handleDelete(record)">删除</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="handleDetail(record)">详情</a>
                </a-menu-item>
              </a-menu>
              <a>更多
                <a-icon type="down" />
              </a>
            </a-dropdown> -->
          </template>
        </span>
      </s-table>
      <!-- 嵌入表单区域 -->
      <create-modal
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk" />
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
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { toDateTime, toDate } from '@/utils/datetime'
import { getList, findById, save, deleteItem } from './api'
import CreateModal from './form-modal.vue' // 切换到抽屉模式 引用改为 './form-drawer.vue'
import DetailModal from './detail-modal.vue'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '项目id',
    dataIndex: 'id',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '项目编号：年月日4位流水号，201010140001',
    dataIndex: 'code',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '项目来源：银行直报 01、公司受理 02',
    dataIndex: 'source',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '所属省',
    dataIndex: 'province',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '所属地市',
    dataIndex: 'city',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '所属区县',
    dataIndex: 'districts',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '主体类型：自然人01、法人02',
    dataIndex: 'mainType',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '客户类型:来源数据字典',
    dataIndex: 'custType',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '客户编号',
    dataIndex: 'custId',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '客户名称：自然人对应姓名，非自然人对应组织全称。',
    dataIndex: 'custName',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '证件号码:身份证号或统一社会信用代码',
    dataIndex: 'identityNo',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '联系电话',
    dataIndex: 'mobile',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '国家农担分类',
    dataIndex: 'standardGuarType',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '国民经济分类',
    dataIndex: 'nationalEconomyType',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '经营主业',
    dataIndex: 'mainBusiness',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '项目分类:首保项目、续保项目、续保增额',
    dataIndex: 'projectType',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '项目类型:产业集群/产业链、普通项目、灾后重建、财政补贴、低风险类、担保产品',
    dataIndex: 'projectCatagory',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '申保金额(万元)',
    dataIndex: 'guarApplyAmount',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '申保期限(月)',
    dataIndex: 'guarApplyPeriod',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '申保反担保措施：信用、抵押、质押、个人保证、企业保证',
    dataIndex: 'counterGuarMeas',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '申保反担保措施说明',
    dataIndex: 'counterGuarMeasDesc',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '贷款方式：01 普通贷款、02 循环贷（随借随还）',
    dataIndex: 'loanType',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '担保方式: 01 一般保证、02 连带责任保证',
    dataIndex: 'guarType',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '还款方式:普通贷款时，必填。分期付息到期还本、利随本清、等额本金、等额本息',
    dataIndex: 'loanRepaymentMethod',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '贷款利率（年化%）',
    dataIndex: 'loanInterestRate',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '借款用途：供风险分析使用(500字以内)',
    dataIndex: 'moneyPurpose',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '担保产品：数据字典（担保产品标签）',
    dataIndex: 'productWarranty',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '集群方案：项目类型为产业集群时，数据字典',
    dataIndex: 'aggregateScheme',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '是否首贷：1 是、0 否，财农〔2020〕15号要求。建议以征信报',
    dataIndex: 'isFirstLoans',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '是否首保：1 是、0 否，首次办理惠农贷业务视作首保。',
    dataIndex: 'isFirstMaintenance',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '是否扶贫：1 是、0 否，扶贫政策类业务标记。',
    dataIndex: 'isPovertyRelief',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '贷款银行全称：精确到支行的银行全称（机构字典）不能改。',
    dataIndex: 'loansBank',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '银行客户经理:默认提报人',
    dataIndex: 'bankCustManagerId',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '银行客户经理:默认提报人',
    dataIndex: 'bankCustManagerName',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '银行客户经理联系方式',
    dataIndex: 'bankCustManagerMobile',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '银行尽调报告和审批结论 附件',
    dataIndex: 'bankApplyAssert',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '审批必备资料 附件（固定19个附件）',
    dataIndex: 'applyAssert',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '市管补充资料,附件',
    dataIndex: 'cityManagerSupplyAssert',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '担保批复编号',
    dataIndex: 'apprCode',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '放款通知编号',
    dataIndex: 'loanCode',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '担保批复日期',
    dataIndex: 'apprDate',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: toDateTime
  },
  {
    title: '担保批复金额(万元)',
    dataIndex: 'apprAmount',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '担保批复期限(月)',
    dataIndex: 'apprPeriod',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '批复反担保措施：枚举：01信用、02抵押、03质押、04个人保证、05企业保证，多选,逗号分隔',
    dataIndex: 'apprCounterGuarMeas',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '批复反担保措施说明',
    dataIndex: 'apprCounterGuarMeasDesc',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '年化担保费率（%/年）',
    dataIndex: 'apprGuarRate',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '借款合同编号',
    dataIndex: 'jkContrCode',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '借款合同金额',
    dataIndex: 'jkContrAmount',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '借款合同期限（月）',
    dataIndex: 'jkCtrctTerm',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '借款合同开始日',
    dataIndex: 'jkCtrctStartDate',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: toDateTime
  },
  {
    title: '借款合同到期日',
    dataIndex: 'jkCtrctEndDate',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: toDateTime
  },
  {
    title: '借款合同利率（年化%）,默认贷款利率，可以改',
    dataIndex: 'jkCtrctInterestRate',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '是否已签订最高额保证合同:0 否（单笔保证合同编号必填） 1 是',
    dataIndex: 'isSignMaxGuarCtrct',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '单笔保证合同编号',
    dataIndex: 'singleGuarCtrctCode',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '担保合同期限（月）',
    dataIndex: 'guarCtrctTerm',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '委保合同编号',
    dataIndex: 'wbCtrctCode',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '保证合同编号',
    dataIndex: 'guarCtrctCode',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '备注说明',
    dataIndex: 'jkCtrctRemarks',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title:
      '合同合集 附件，根据批复反担保措施选项，抵押的话需要上传抵押合同，抵押质押的话，上传抵押质押合同，结果存储到附件表',
    dataIndex: 'jkCtrctCollection',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '业务状态：10提报中、20审批中、30待签约、40待出函、50待放款、60已放款、90已作废',
    dataIndex: 'status',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '逻辑删除: 1 已删除',
    dataIndex: 'isDelete',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '创建人id',
    dataIndex: 'creationUserId',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '创建时间',
    dataIndex: 'creationTime',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: toDateTime
  },
  {
    title: '最后修改人id',
    dataIndex: 'lastModifiedUserId',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '最后修改时间',
    dataIndex: 'lastModifiedTime',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: toDateTime
  },
  {
    title: '删除人id',
    dataIndex: 'deletionTime',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '删除时间',
    dataIndex: 'deletionUserId',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: toDateTime
  },
  {
    title: '任务id',
    dataIndex: 'wfTaskId',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '工作流实例id',
    dataIndex: 'wfInstId',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '任务名称',
    dataIndex: 'wfTaskName',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '节点id',
    dataIndex: 'wfNodeId',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '节点名称',
    dataIndex: 'wfNodeName',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: toDateTime
  },
  {
    title: '修改者',
    dataIndex: 'updator',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: toDateTime
  },
  {
    title: '创建人名称',
    dataIndex: 'createName',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '修改人名称',
    dataIndex: 'updateName',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '批复反担保措施-信用',
    dataIndex: 'apprCounterGuarMeasCredit',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '批复反担保措施-抵押',
    dataIndex: 'apprCounterGuarMeasMortgage',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '批复反担保措施-质押',
    dataIndex: 'apprCounterGuarMeasPledge',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '批复反担保措施-担保',
    dataIndex: 'apprCounterGuarMeasGuarantee',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '批复反担保措施-以物抵债',
    dataIndex: 'apprCounterGuarMeasByPro',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '批复反担保措施-其他',
    dataIndex: 'apprCounterGuarMeasOther',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '申保反担保措施-信用',
    dataIndex: 'counterGuarMeasCredit',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '申保反担保措施-抵押',
    dataIndex: 'counterGuarMeasMortgage',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '申保反担保措施-质押',
    dataIndex: 'counterGuarMeasPledge',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '申保反担保措施-担保',
    dataIndex: 'counterGuarMeasGuarantee',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '申保反担保措施-以物抵债',
    dataIndex: 'counterGuarMeasByPro',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '申保反担保措施-其他',
    dataIndex: 'counterGuarMeasOther',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '预审结果',
    dataIndex: 'finalResult',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px'
  },
  {
    title: '审批条件是否已落实',
    dataIndex: 'auditImpl',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '法律文件是否已完善',
    dataIndex: 'lawImpl',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
  },
  {
    title: '保费是否缴纳',
    dataIndex: 'feePay',
    ellipsis: false, // 超过宽度将自动省略
    align: 'left', // 设置列内容的对齐方式 'left' | 'right' | 'center'
    width: '200px',
    customRender: (value) => (value ? '是' : '否')
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
    CreateModal,
    DetailModal
  },
  data () {
    return {
      columns: columns,
      // create model
      visible: false,
      // 详情页显示
      detailVisible: false,
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
          const result = {
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
  filters: {},
  created () {
    // 此处可以进行表单中的一些字典的初始化
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
      // 方式一 弹框编辑模式
      // this.mdl = null
      // this.visible = true

      // 方式二 编辑页的方式,需要将form-page 注册到路由，path替换为真实注册的路由
      this.$router.push({ path: '/demo/projectdetail' })
    },
    /** 触发编辑 */
    handleEdit (record) {
      // 方式一 弹框编辑模式
      // this.visible = true
      // this.mdl = { ...record }
      // 方式二 编辑页的方式,需要将form-page 注册到路由，path替换为真实注册的路由
      const param = { path: '/demo/projectdetail' }
      param.query = { id: record.id }
      this.$router.push(param)
    },
    /** 查看详情 */
    handleDetail (record) {
      this.detailVisible = true
      this.mdl = { ...record }
    },
    /** 单条业务删除 */
    handleDelete (record) {
      deleteItem(record.id)
        .then((res) => {
          this.refreshTable()
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
              this.refreshTable()
              this.$message.info('修改成功')
            })
            .catch((e) => {
              // 保存失败
              // 触发加载动画
              this.confirmLoading = false
              this.$message.error('保存失败')
            })
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
    handleDetailCancel () {
      this.detailVisible = false
    },
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
    },
    /** 刷新表格数据 */
    refreshTable () {
      const form = this.$refs.createModal.form
      // 关闭新增、编辑的窗口
      this.visible = false
      // 触发加载动画
      this.confirmLoading = false
      // 重置表单数据
      form.resetFields()
      // 刷新表格
      this.$refs.table.refresh()
    }
  }
}
</script>
