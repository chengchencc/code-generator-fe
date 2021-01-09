<template>
  <page-header-wrapper :title="true" content="对于复杂的表单页面，适合将表单分离到一个单独的页面中。">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-spin :spinning="loading">
        <a-form :form="form" v-bind="formLayout">
          <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
          <a-form-item v-show="model" label="主键ID">
            <a-input v-decorator="['id', { initialValue: null }]" disabled />
          </a-form-item>
          <a-form-item label="项目编号：年月日4位流水号，201010140001">
            <a-input v-decorator="['code',validatorRules.code ]" />

          </a-form-item>
          <a-form-item label="项目来源：银行直报 01、公司受理 02">
            <a-input v-decorator="['source',validatorRules.source ]" />

          </a-form-item>
          <a-form-item label="所属省">
            <a-input v-decorator="['province',validatorRules.province ]" />

          </a-form-item>
          <a-form-item label="所属地市">
            <a-input v-decorator="['city',validatorRules.city ]" />

          </a-form-item>
          <a-form-item label="所属区县">
            <a-input v-decorator="['districts',validatorRules.districts ]" />

          </a-form-item>
          <a-form-item label="主体类型：自然人01、法人02">
            <a-input v-decorator="['mainType',validatorRules.mainType ]" />

          </a-form-item>
          <a-form-item label="客户类型:来源数据字典">
            <a-input v-decorator="['custType',validatorRules.custType ]" />

          </a-form-item>
          <a-form-item label="客户编号">
            <a-input v-decorator="['custId',validatorRules.custId ]" />

          </a-form-item>
          <a-form-item label="客户名称：自然人对应姓名，非自然人对应组织全称。">
            <a-input v-decorator="['custName',validatorRules.custName ]" />

          </a-form-item>
          <a-form-item label="证件号码:身份证号或统一社会信用代码">
            <a-input v-decorator="['identityNo',validatorRules.identityNo ]" />

          </a-form-item>
          <a-form-item label="联系电话">
            <a-input v-decorator="['mobile',validatorRules.mobile ]" />

          </a-form-item>
          <a-form-item label="国家农担分类">
            <a-input v-decorator="['standardGuarType',validatorRules.standardGuarType ]" />

          </a-form-item>
          <a-form-item label="国民经济分类">
            <a-input v-decorator="['nationalEconomyType',validatorRules.nationalEconomyType ]" />

          </a-form-item>
          <a-form-item label="经营主业">
            <a-input v-decorator="['mainBusiness',validatorRules.mainBusiness ]" />

          </a-form-item>
          <a-form-item label="项目分类:首保项目、续保项目、续保增额">
            <a-input v-decorator="['projectType',validatorRules.projectType ]" />

          </a-form-item>
          <a-form-item label="项目类型:产业集群/产业链、普通项目、灾后重建、财政补贴、低风险类、担保产品">
            <a-input v-decorator="['projectCatagory',validatorRules.projectCatagory ]" />

          </a-form-item>
          <a-form-item label="申保金额(万元)">
            <a-input v-decorator="['guarApplyAmount',validatorRules.guarApplyAmount ]" />

          </a-form-item>
          <a-form-item label="申保期限(月)">
            <a-input v-decorator="['guarApplyPeriod',validatorRules.guarApplyPeriod ]" />

          </a-form-item>
          <a-form-item label="申保反担保措施：信用、抵押、质押、个人保证、企业保证">
            <a-input v-decorator="['counterGuarMeas',validatorRules.counterGuarMeas ]" />

          </a-form-item>
          <a-form-item label="申保反担保措施说明">
            <a-input v-decorator="['counterGuarMeasDesc',validatorRules.counterGuarMeasDesc ]" />

          </a-form-item>
          <a-form-item label="贷款方式：01 普通贷款、02 循环贷（随借随还）">
            <a-input v-decorator="['loanType',validatorRules.loanType ]" />

          </a-form-item>
          <a-form-item label="担保方式: 01 一般保证、02 连带责任保证">
            <a-input v-decorator="['guarType',validatorRules.guarType ]" />

          </a-form-item>
          <a-form-item label="还款方式:普通贷款时，必填。分期付息到期还本、利随本清、等额本金、等额本息">
            <a-input v-decorator="['loanRepaymentMethod',validatorRules.loanRepaymentMethod ]" />

          </a-form-item>
          <a-form-item label="贷款利率（年化%）">
            <a-input v-decorator="['loanInterestRate',validatorRules.loanInterestRate ]" />

          </a-form-item>
          <a-form-item label="借款用途：供风险分析使用(500字以内)">
            <a-input v-decorator="['moneyPurpose',validatorRules.moneyPurpose ]" />

          </a-form-item>
          <a-form-item label="担保产品：数据字典（担保产品标签）">
            <a-input v-decorator="['productWarranty',validatorRules.productWarranty ]" />

          </a-form-item>
          <a-form-item label="集群方案：项目类型为产业集群时，数据字典">
            <a-input v-decorator="['aggregateScheme',validatorRules.aggregateScheme ]" />

          </a-form-item>
          <a-form-item label="是否首贷：1 是、0 否，财农〔2020〕15号要求。建议以征信报">
            <a-switch v-decorator="['isFirstLoans', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="是否首保：1 是、0 否，首次办理惠农贷业务视作首保。">
            <a-switch v-decorator="['isFirstMaintenance', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="是否扶贫：1 是、0 否，扶贫政策类业务标记。">
            <a-switch v-decorator="['isPovertyRelief', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="贷款银行全称：精确到支行的银行全称（机构字典）不能改。">
            <a-input v-decorator="['loansBank',validatorRules.loansBank ]" />

          </a-form-item>
          <a-form-item label="银行客户经理:默认提报人">
            <a-input v-decorator="['bankCustManagerId',validatorRules.bankCustManagerId ]" />

          </a-form-item>
          <a-form-item label="银行客户经理:默认提报人">
            <a-input v-decorator="['bankCustManagerName',validatorRules.bankCustManagerName ]" />

          </a-form-item>
          <a-form-item label="银行客户经理联系方式">
            <a-input v-decorator="['bankCustManagerMobile',validatorRules.bankCustManagerMobile ]" />

          </a-form-item>
          <a-form-item label="银行尽调报告和审批结论 附件">
            <a-input v-decorator="['bankApplyAssert',validatorRules.bankApplyAssert ]" />

          </a-form-item>
          <a-form-item label="审批必备资料 附件（固定19个附件）">
            <a-input v-decorator="['applyAssert',validatorRules.applyAssert ]" />

          </a-form-item>
          <a-form-item label="备注">
            <a-input v-decorator="['remark',validatorRules.remark ]" />

          </a-form-item>
          <a-form-item label="市管补充资料,附件">
            <a-input v-decorator="['cityManagerSupplyAssert',validatorRules.cityManagerSupplyAssert ]" />

          </a-form-item>
          <a-form-item label="担保批复编号">
            <a-input v-decorator="['apprCode',validatorRules.apprCode ]" />

          </a-form-item>
          <a-form-item label="放款通知编号">
            <a-input v-decorator="['loanCode',validatorRules.loanCode ]" />

          </a-form-item>
          <a-form-item label="担保批复日期">
            <a-date-picker v-decorator="['apprDate',validatorRules.apprDate ]" />

          </a-form-item>
          <a-form-item label="担保批复金额(万元)">
            <a-input v-decorator="['apprAmount',validatorRules.apprAmount ]" />

          </a-form-item>
          <a-form-item label="担保批复期限(月)">
            <a-input v-decorator="['apprPeriod',validatorRules.apprPeriod ]" />

          </a-form-item>
          <a-form-item label="批复反担保措施：枚举：01信用、02抵押、03质押、04个人保证、05企业保证，多选,逗号分隔">
            <a-input v-decorator="['apprCounterGuarMeas',validatorRules.apprCounterGuarMeas ]" />

          </a-form-item>
          <a-form-item label="批复反担保措施说明">
            <a-input v-decorator="['apprCounterGuarMeasDesc',validatorRules.apprCounterGuarMeasDesc ]" />

          </a-form-item>
          <a-form-item label="年化担保费率（%/年）">
            <a-input v-decorator="['apprGuarRate',validatorRules.apprGuarRate ]" />

          </a-form-item>
          <a-form-item label="借款合同编号">
            <a-input v-decorator="['jkContrCode',validatorRules.jkContrCode ]" />

          </a-form-item>
          <a-form-item label="借款合同金额">
            <a-input v-decorator="['jkContrAmount',validatorRules.jkContrAmount ]" />

          </a-form-item>
          <a-form-item label="借款合同期限（月）">
            <a-input v-decorator="['jkCtrctTerm',validatorRules.jkCtrctTerm ]" />

          </a-form-item>
          <a-form-item label="借款合同开始日">
            <a-date-picker v-decorator="['jkCtrctStartDate',validatorRules.jkCtrctStartDate ]" />

          </a-form-item>
          <a-form-item label="借款合同到期日">
            <a-date-picker v-decorator="['jkCtrctEndDate',validatorRules.jkCtrctEndDate ]" />

          </a-form-item>
          <a-form-item label="借款合同利率（年化%）,默认贷款利率，可以改">
            <a-input v-decorator="['jkCtrctInterestRate',validatorRules.jkCtrctInterestRate ]" />

          </a-form-item>
          <a-form-item label="是否已签订最高额保证合同:0 否（单笔保证合同编号必填） 1 是">
            <a-switch v-decorator="['isSignMaxGuarCtrct', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="单笔保证合同编号">
            <a-input v-decorator="['singleGuarCtrctCode',validatorRules.singleGuarCtrctCode ]" />

          </a-form-item>
          <a-form-item label="担保合同期限（月）">
            <a-input v-decorator="['guarCtrctTerm',validatorRules.guarCtrctTerm ]" />

          </a-form-item>
          <a-form-item label="委保合同编号">
            <a-input v-decorator="['wbCtrctCode',validatorRules.wbCtrctCode ]" />

          </a-form-item>
          <a-form-item label="保证合同编号">
            <a-input v-decorator="['guarCtrctCode',validatorRules.guarCtrctCode ]" />

          </a-form-item>
          <a-form-item label="备注说明">
            <a-input v-decorator="['jkCtrctRemarks',validatorRules.jkCtrctRemarks ]" />

          </a-form-item>
          <a-form-item label="合同合集 附件，根据批复反担保措施选项，抵押的话需要上传抵押合同，抵押质押的话，上传抵押质押合同，结果存储到附件表">
            <a-input v-decorator="['jkCtrctCollection',validatorRules.jkCtrctCollection ]" />

          </a-form-item>
          <a-form-item label="业务状态：10提报中、20审批中、30待签约、40待出函、50待放款、60已放款、90已作废">
            <a-input v-decorator="['status',validatorRules.status ]" />

          </a-form-item>
          <a-form-item label="逻辑删除: 1 已删除">
            <a-switch v-decorator="['isDelete', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="创建人id">
            <a-input v-decorator="['creationUserId',validatorRules.creationUserId ]" />

          </a-form-item>
          <a-form-item label="创建时间">
            <a-date-picker v-decorator="['creationTime',validatorRules.creationTime ]" />

          </a-form-item>
          <a-form-item label="最后修改人id">
            <a-input v-decorator="['lastModifiedUserId',validatorRules.lastModifiedUserId ]" />

          </a-form-item>
          <a-form-item label="最后修改时间">
            <a-date-picker v-decorator="['lastModifiedTime',validatorRules.lastModifiedTime ]" />

          </a-form-item>
          <a-form-item label="删除人id">
            <a-input v-decorator="['deletionTime',validatorRules.deletionTime ]" />

          </a-form-item>
          <a-form-item label="删除时间">
            <a-date-picker v-decorator="['deletionUserId',validatorRules.deletionUserId ]" />

          </a-form-item>
          <a-form-item label="任务id">
            <a-input v-decorator="['wfTaskId',validatorRules.wfTaskId ]" />

          </a-form-item>
          <a-form-item label="工作流实例id">
            <a-input v-decorator="['wfInstId',validatorRules.wfInstId ]" />

          </a-form-item>
          <a-form-item label="任务名称">
            <a-input v-decorator="['wfTaskName',validatorRules.wfTaskName ]" />

          </a-form-item>
          <a-form-item label="节点id">
            <a-input v-decorator="['wfNodeId',validatorRules.wfNodeId ]" />

          </a-form-item>
          <a-form-item label="节点名称">
            <a-input v-decorator="['wfNodeName',validatorRules.wfNodeName ]" />

          </a-form-item>
          <a-form-item label="创建人名称">
            <a-input v-decorator="['createName',validatorRules.createName ]" />

          </a-form-item>
          <a-form-item label="修改人名称">
            <a-input v-decorator="['updateName',validatorRules.updateName ]" />

          </a-form-item>
          <a-form-item label="批复反担保措施-信用">
            <a-switch v-decorator="['apprCounterGuarMeasCredit', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="批复反担保措施-抵押">
            <a-switch v-decorator="['apprCounterGuarMeasMortgage', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="批复反担保措施-质押">
            <a-switch v-decorator="['apprCounterGuarMeasPledge', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="批复反担保措施-担保">
            <a-switch v-decorator="['apprCounterGuarMeasGuarantee', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="批复反担保措施-以物抵债">
            <a-switch v-decorator="['apprCounterGuarMeasByPro', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="批复反担保措施-其他">
            <a-switch v-decorator="['apprCounterGuarMeasOther', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="申保反担保措施-信用">
            <a-switch v-decorator="['counterGuarMeasCredit', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="申保反担保措施-抵押">
            <a-switch v-decorator="['counterGuarMeasMortgage', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="申保反担保措施-质押">
            <a-switch v-decorator="['counterGuarMeasPledge', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="申保反担保措施-担保">
            <a-switch v-decorator="['counterGuarMeasGuarantee', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="申保反担保措施-以物抵债">
            <a-switch v-decorator="['counterGuarMeasByPro', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="申保反担保措施-其他">
            <a-switch v-decorator="['counterGuarMeasOther', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="预审结果">
            <a-input v-decorator="['finalResult',validatorRules.finalResult ]" />

          </a-form-item>
          <a-form-item label="审批条件是否已落实">
            <a-switch v-decorator="['auditImpl', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="法律文件是否已完善">
            <a-switch v-decorator="['lawImpl', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item label="保费是否缴纳">
            <a-switch v-decorator="['feePay', { valuePropName: 'checked' }]" />

          </a-form-item>
          <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
            <a-button htmlType="submit" type="primary" @click="handleSubmit" :loading="confirmLoading">保存</a-button>
            <a-button style="margin-left: 8px" @click="handleCancle">取消</a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import pick from 'lodash.pick'
import { getList, findById, save, deleteItem } from './api'

// 表单字段
const fields = [
  'id',
  'code',
  'source',
  'province',
  'city',
  'districts',
  'mainType',
  'custType',
  'custId',
  'custName',
  'identityNo',
  'mobile',
  'standardGuarType',
  'nationalEconomyType',
  'mainBusiness',
  'projectType',
  'projectCatagory',
  'guarApplyAmount',
  'guarApplyPeriod',
  'counterGuarMeas',
  'counterGuarMeasDesc',
  'loanType',
  'guarType',
  'loanRepaymentMethod',
  'loanInterestRate',
  'moneyPurpose',
  'productWarranty',
  'aggregateScheme',
  'isFirstLoans',
  'isFirstMaintenance',
  'isPovertyRelief',
  'loansBank',
  'bankCustManagerId',
  'bankCustManagerName',
  'bankCustManagerMobile',
  'bankApplyAssert',
  'applyAssert',
  'remark',
  'cityManagerSupplyAssert',
  'apprCode',
  'loanCode',
  'apprDate',
  'apprAmount',
  'apprPeriod',
  'apprCounterGuarMeas',
  'apprCounterGuarMeasDesc',
  'apprGuarRate',
  'jkContrCode',
  'jkContrAmount',
  'jkCtrctTerm',
  'jkCtrctStartDate',
  'jkCtrctEndDate',
  'jkCtrctInterestRate',
  'isSignMaxGuarCtrct',
  'singleGuarCtrctCode',
  'guarCtrctTerm',
  'wbCtrctCode',
  'guarCtrctCode',
  'jkCtrctRemarks',
  'jkCtrctCollection',
  'status',
  'isDelete',
  'creationUserId',
  'creationTime',
  'lastModifiedUserId',
  'lastModifiedTime',
  'deletionTime',
  'deletionUserId',
  'wfTaskId',
  'wfInstId',
  'wfTaskName',
  'wfNodeId',
  'wfNodeName',
  'createName',
  'updateName',
  'apprCounterGuarMeasCredit',
  'apprCounterGuarMeasMortgage',
  'apprCounterGuarMeasPledge',
  'apprCounterGuarMeasGuarantee',
  'apprCounterGuarMeasByPro',
  'apprCounterGuarMeasOther',
  'counterGuarMeasCredit',
  'counterGuarMeasMortgage',
  'counterGuarMeasPledge',
  'counterGuarMeasGuarantee',
  'counterGuarMeasByPro',
  'counterGuarMeasOther',
  'finalResult',
  'auditImpl',
  'lawImpl',
  'feePay'
]

export default {
  props: {},
  data () {
    return {
      // 表单公共布局，在单独 a-from-item 中可以进行个性化配置
      formLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        }
      },
      // 保存按钮加载控制
      confirmLoading: false,
      // 数据加载中
      loading: false,
      id: '',
      // 数据
      model: {},
      // 校验规则
      validatorRules: {
        code: { rules: [{ required: false }, { validator: this.validateCode }] },
        source: { rules: [{ required: false }, { validator: this.validateSource }] },
        province: { rules: [{ required: false }, { validator: this.validateProvince }] },
        city: { rules: [{ required: false }, { validator: this.validateCity }] },
        districts: { rules: [{ required: false }, { validator: this.validateDistricts }] },
        mainType: { rules: [{ required: false }, { validator: this.validateMainType }] },
        custType: { rules: [{ required: false }, { validator: this.validateCustType }] },
        custId: { rules: [{ required: false }, { validator: this.validateCustId }] },
        custName: { rules: [{ required: false }, { validator: this.validateCustName }] },
        identityNo: { rules: [{ required: false }, { validator: this.validateIdentityNo }] },
        mobile: { rules: [{ required: false }, { validator: this.validateMobile }] },
        standardGuarType: { rules: [{ required: false }, { validator: this.validateStandardGuarType }] },
        nationalEconomyType: { rules: [{ required: false }, { validator: this.validateNationalEconomyType }] },
        mainBusiness: { rules: [{ required: false }, { validator: this.validateMainBusiness }] },
        projectType: { rules: [{ required: false }, { validator: this.validateProjectType }] },
        projectCatagory: { rules: [{ required: false }, { validator: this.validateProjectCatagory }] },
        guarApplyAmount: { rules: [{ required: false }, { validator: this.validateGuarApplyAmount }] },
        guarApplyPeriod: { rules: [{ required: false }, { validator: this.validateGuarApplyPeriod }] },
        counterGuarMeas: { rules: [{ required: false }, { validator: this.validateCounterGuarMeas }] },
        counterGuarMeasDesc: { rules: [{ required: false }, { validator: this.validateCounterGuarMeasDesc }] },
        loanType: { rules: [{ required: false }, { validator: this.validateLoanType }] },
        guarType: { rules: [{ required: false }, { validator: this.validateGuarType }] },
        loanRepaymentMethod: { rules: [{ required: false }, { validator: this.validateLoanRepaymentMethod }] },
        loanInterestRate: { rules: [{ required: false }, { validator: this.validateLoanInterestRate }] },
        moneyPurpose: { rules: [{ required: false }, { validator: this.validateMoneyPurpose }] },
        productWarranty: { rules: [{ required: false }, { validator: this.validateProductWarranty }] },
        aggregateScheme: { rules: [{ required: false }, { validator: this.validateAggregateScheme }] },
        isFirstLoans: { rules: [{ required: false }, { validator: this.validateIsFirstLoans }] },
        isFirstMaintenance: { rules: [{ required: false }, { validator: this.validateIsFirstMaintenance }] },
        isPovertyRelief: { rules: [{ required: false }, { validator: this.validateIsPovertyRelief }] },
        loansBank: { rules: [{ required: false }, { validator: this.validateLoansBank }] },
        bankCustManagerId: { rules: [{ required: false }, { validator: this.validateBankCustManagerId }] },
        bankCustManagerName: { rules: [{ required: false }, { validator: this.validateBankCustManagerName }] },
        bankCustManagerMobile: { rules: [{ required: false }, { validator: this.validateBankCustManagerMobile }] },
        bankApplyAssert: { rules: [{ required: false }, { validator: this.validateBankApplyAssert }] },
        applyAssert: { rules: [{ required: false }, { validator: this.validateApplyAssert }] },
        remark: { rules: [{ required: false }, { validator: this.validateRemark }] },
        cityManagerSupplyAssert: { rules: [{ required: false }, { validator: this.validateCityManagerSupplyAssert }] },
        apprCode: { rules: [{ required: false }, { validator: this.validateApprCode }] },
        loanCode: { rules: [{ required: false }, { validator: this.validateLoanCode }] },
        apprDate: { rules: [{ required: false }, { validator: this.validateApprDate }] },
        apprAmount: { rules: [{ required: false }, { validator: this.validateApprAmount }] },
        apprPeriod: { rules: [{ required: false }, { validator: this.validateApprPeriod }] },
        apprCounterGuarMeas: { rules: [{ required: false }, { validator: this.validateApprCounterGuarMeas }] },
        apprCounterGuarMeasDesc: { rules: [{ required: false }, { validator: this.validateApprCounterGuarMeasDesc }] },
        apprGuarRate: { rules: [{ required: false }, { validator: this.validateApprGuarRate }] },
        jkContrCode: { rules: [{ required: false }, { validator: this.validateJkContrCode }] },
        jkContrAmount: { rules: [{ required: false }, { validator: this.validateJkContrAmount }] },
        jkCtrctTerm: { rules: [{ required: false }, { validator: this.validateJkCtrctTerm }] },
        jkCtrctStartDate: { rules: [{ required: false }, { validator: this.validateJkCtrctStartDate }] },
        jkCtrctEndDate: { rules: [{ required: false }, { validator: this.validateJkCtrctEndDate }] },
        jkCtrctInterestRate: { rules: [{ required: false }, { validator: this.validateJkCtrctInterestRate }] },
        isSignMaxGuarCtrct: { rules: [{ required: false }, { validator: this.validateIsSignMaxGuarCtrct }] },
        singleGuarCtrctCode: { rules: [{ required: false }, { validator: this.validateSingleGuarCtrctCode }] },
        guarCtrctTerm: { rules: [{ required: false }, { validator: this.validateGuarCtrctTerm }] },
        wbCtrctCode: { rules: [{ required: false }, { validator: this.validateWbCtrctCode }] },
        guarCtrctCode: { rules: [{ required: false }, { validator: this.validateGuarCtrctCode }] },
        jkCtrctRemarks: { rules: [{ required: false }, { validator: this.validateJkCtrctRemarks }] },
        jkCtrctCollection: { rules: [{ required: false }, { validator: this.validateJkCtrctCollection }] },
        status: { rules: [{ required: false }, { validator: this.validateStatus }] },
        isDelete: { rules: [{ required: false }, { validator: this.validateIsDelete }] },
        creationUserId: { rules: [{ required: false }, { validator: this.validateCreationUserId }] },
        creationTime: { rules: [{ required: false }, { validator: this.validateCreationTime }] },
        lastModifiedUserId: { rules: [{ required: false }, { validator: this.validateLastModifiedUserId }] },
        lastModifiedTime: { rules: [{ required: false }, { validator: this.validateLastModifiedTime }] },
        deletionTime: { rules: [{ required: false }, { validator: this.validateDeletionTime }] },
        deletionUserId: { rules: [{ required: false }, { validator: this.validateDeletionUserId }] },
        wfTaskId: { rules: [{ required: false }, { validator: this.validateWfTaskId }] },
        wfInstId: { rules: [{ required: false }, { validator: this.validateWfInstId }] },
        wfTaskName: { rules: [{ required: false }, { validator: this.validateWfTaskName }] },
        wfNodeId: { rules: [{ required: false }, { validator: this.validateWfNodeId }] },
        wfNodeName: { rules: [{ required: false }, { validator: this.validateWfNodeName }] },
        createName: { rules: [{ required: false }, { validator: this.validateCreateName }] },
        updateName: { rules: [{ required: false }, { validator: this.validateUpdateName }] },
        apprCounterGuarMeasCredit: {
          rules: [{ required: false }, { validator: this.validateApprCounterGuarMeasCredit }]
        },
        apprCounterGuarMeasMortgage: {
          rules: [{ required: false }, { validator: this.validateApprCounterGuarMeasMortgage }]
        },
        apprCounterGuarMeasPledge: {
          rules: [{ required: false }, { validator: this.validateApprCounterGuarMeasPledge }]
        },
        apprCounterGuarMeasGuarantee: {
          rules: [{ required: false }, { validator: this.validateApprCounterGuarMeasGuarantee }]
        },
        apprCounterGuarMeasByPro: {
          rules: [{ required: false }, { validator: this.validateApprCounterGuarMeasByPro }]
        },
        apprCounterGuarMeasOther: {
          rules: [{ required: false }, { validator: this.validateApprCounterGuarMeasOther }]
        },
        counterGuarMeasCredit: { rules: [{ required: false }, { validator: this.validateCounterGuarMeasCredit }] },
        counterGuarMeasMortgage: { rules: [{ required: false }, { validator: this.validateCounterGuarMeasMortgage }] },
        counterGuarMeasPledge: { rules: [{ required: false }, { validator: this.validateCounterGuarMeasPledge }] },
        counterGuarMeasGuarantee: {
          rules: [{ required: false }, { validator: this.validateCounterGuarMeasGuarantee }]
        },
        counterGuarMeasByPro: { rules: [{ required: false }, { validator: this.validateCounterGuarMeasByPro }] },
        counterGuarMeasOther: { rules: [{ required: false }, { validator: this.validateCounterGuarMeasOther }] },
        finalResult: { rules: [{ required: false }, { validator: this.validateFinalResult }] },
        auditImpl: { rules: [{ required: false }, { validator: this.validateAuditImpl }] },
        lawImpl: { rules: [{ required: false }, { validator: this.validateLawImpl }] },
        feePay: { rules: [{ required: false }, { validator: this.validateFeePay }] }
      }
    }
  },
  beforeCreate () {},
  created () {
    console.log('custom modal created')
    this.form = this.$form.createForm(this)

    // 防止表单未注册
    fields.forEach((v) => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      console.log('model change', this.model)
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  mounted () {
    // vue 生命周期钩子，已完成模板渲染，此处可以进行dom操作
    // 初次加载数据
    this.id = this.$route.query.id
    // id 有值的话为编辑，无值则为新增
    if (this.id) {
      this.loadData()
    } else {
      this.model = null
    }
  },
  methods: {
    loadData () {
      findById(this.id)
        .then((res) => {
          this.model = res.datas
        })
        .catch((e) => {
          this.$message.error('获取数据失败')
        })
    },
    handleSubmit () {
      this.confirmLoading = true
      this.form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          save(values)
            .then((res) => {
              this.$message.info('修改成功')
              // 跳转到列表页面
              this.goback()
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
    handleCancle () {
      this.goback()
    },
    /** 返回到上一页 */
    goback () {
      this.$router.go(-1)
    },
    // 自定义校验逻辑代码写在这里
    // 若校验成功，回调callback，参数为空 ： callback()
    // 若校验失败，回调callback ： callback('校验失败提示信息')
    // 示例如下：
    // 示例1：正则校验
    // eslint-disable-next-line standard/no-callback-literal
    // if (!value || new RegExp(/^1[3|4|5|7|8][0-9]\d{8}$/).test(value)) {
    //   callback()
    // } else {
    //   // eslint-disable-next-line standard/no-callback-literal
    //   callback('请输入正确格式的手机号码!')
    // }
    // 示例2：获取form中一个值，与当前输入值尽心比较
    // const form = this.form
    // const confirmPassword = form.getFieldValue('confirmPassword')
    // if (value && confirmPassword && value !== confirmPassword) {
    //   // eslint-disable-next-line standard/no-callback-literal
    //   callback('两次输入的密码不一样！')
    // }
    // if (value && this.confirmDirty) {
    //   form.validateFields(['confirm'], { force: true })
    // }
    // callback()
    validateCode (rule, value, callback) {
      callback()
      // callback(请输入正确的项目编号：年月日4位流水号，201010140001)
    },
    validateSource (rule, value, callback) {
      callback()
      // callback(请输入正确的项目来源：银行直报 01、公司受理 02)
    },
    validateProvince (rule, value, callback) {
      callback()
      // callback(请输入正确的所属省)
    },
    validateCity (rule, value, callback) {
      callback()
      // callback(请输入正确的所属地市)
    },
    validateDistricts (rule, value, callback) {
      callback()
      // callback(请输入正确的所属区县)
    },
    validateMainType (rule, value, callback) {
      callback()
      // callback(请输入正确的主体类型：自然人01、法人02)
    },
    validateCustType (rule, value, callback) {
      callback()
      // callback(请输入正确的客户类型:来源数据字典)
    },
    validateCustId (rule, value, callback) {
      callback()
      // callback(请输入正确的客户编号)
    },
    validateCustName (rule, value, callback) {
      callback()
      // callback(请输入正确的客户名称：自然人对应姓名，非自然人对应组织全称。)
    },
    validateIdentityNo (rule, value, callback) {
      callback()
      // callback(请输入正确的证件号码:身份证号或统一社会信用代码)
    },
    validateMobile (rule, value, callback) {
      callback()
      // callback(请输入正确的联系电话)
    },
    validateStandardGuarType (rule, value, callback) {
      callback()
      // callback(请输入正确的国家农担分类)
    },
    validateNationalEconomyType (rule, value, callback) {
      callback()
      // callback(请输入正确的国民经济分类)
    },
    validateMainBusiness (rule, value, callback) {
      callback()
      // callback(请输入正确的经营主业)
    },
    validateProjectType (rule, value, callback) {
      callback()
      // callback(请输入正确的项目分类:首保项目、续保项目、续保增额)
    },
    validateProjectCatagory (rule, value, callback) {
      callback()
      // callback(请输入正确的项目类型:产业集群/产业链、普通项目、灾后重建、财政补贴、低风险类、担保产品)
    },
    validateGuarApplyAmount (rule, value, callback) {
      callback()
      // callback(请输入正确的申保金额(万元))
    },
    validateGuarApplyPeriod (rule, value, callback) {
      callback()
      // callback(请输入正确的申保期限(月))
    },
    validateCounterGuarMeas (rule, value, callback) {
      callback()
      // callback(请输入正确的申保反担保措施：信用、抵押、质押、个人保证、企业保证)
    },
    validateCounterGuarMeasDesc (rule, value, callback) {
      callback()
      // callback(请输入正确的申保反担保措施说明)
    },
    validateLoanType (rule, value, callback) {
      callback()
      // callback(请输入正确的贷款方式：01 普通贷款、02 循环贷（随借随还）)
    },
    validateGuarType (rule, value, callback) {
      callback()
      // callback(请输入正确的担保方式: 01 一般保证、02 连带责任保证)
    },
    validateLoanRepaymentMethod (rule, value, callback) {
      callback()
      // callback(请输入正确的还款方式:普通贷款时，必填。分期付息到期还本、利随本清、等额本金、等额本息)
    },
    validateLoanInterestRate (rule, value, callback) {
      callback()
      // callback(请输入正确的贷款利率（年化%）)
    },
    validateMoneyPurpose (rule, value, callback) {
      callback()
      // callback(请输入正确的借款用途：供风险分析使用(500字以内))
    },
    validateProductWarranty (rule, value, callback) {
      callback()
      // callback(请输入正确的担保产品：数据字典（担保产品标签）)
    },
    validateAggregateScheme (rule, value, callback) {
      callback()
      // callback(请输入正确的集群方案：项目类型为产业集群时，数据字典)
    },
    validateIsFirstLoans (rule, value, callback) {
      callback()
      // callback(请输入正确的是否首贷：1 是、0 否，财农〔2020〕15号要求。建议以征信报)
    },
    validateIsFirstMaintenance (rule, value, callback) {
      callback()
      // callback(请输入正确的是否首保：1 是、0 否，首次办理惠农贷业务视作首保。)
    },
    validateIsPovertyRelief (rule, value, callback) {
      callback()
      // callback(请输入正确的是否扶贫：1 是、0 否，扶贫政策类业务标记。)
    },
    validateLoansBank (rule, value, callback) {
      callback()
      // callback(请输入正确的贷款银行全称：精确到支行的银行全称（机构字典）不能改。)
    },
    validateBankCustManagerId (rule, value, callback) {
      callback()
      // callback(请输入正确的银行客户经理:默认提报人)
    },
    validateBankCustManagerName (rule, value, callback) {
      callback()
      // callback(请输入正确的银行客户经理:默认提报人)
    },
    validateBankCustManagerMobile (rule, value, callback) {
      callback()
      // callback(请输入正确的银行客户经理联系方式)
    },
    validateBankApplyAssert (rule, value, callback) {
      callback()
      // callback(请输入正确的银行尽调报告和审批结论 附件)
    },
    validateApplyAssert (rule, value, callback) {
      callback()
      // callback(请输入正确的审批必备资料 附件（固定19个附件）)
    },
    validateRemark (rule, value, callback) {
      callback()
      // callback(请输入正确的备注)
    },
    validateCityManagerSupplyAssert (rule, value, callback) {
      callback()
      // callback(请输入正确的市管补充资料,附件)
    },
    validateApprCode (rule, value, callback) {
      callback()
      // callback(请输入正确的担保批复编号)
    },
    validateLoanCode (rule, value, callback) {
      callback()
      // callback(请输入正确的放款通知编号)
    },
    validateApprDate (rule, value, callback) {
      callback()
      // callback(请输入正确的担保批复日期)
    },
    validateApprAmount (rule, value, callback) {
      callback()
      // callback(请输入正确的担保批复金额(万元))
    },
    validateApprPeriod (rule, value, callback) {
      callback()
      // callback(请输入正确的担保批复期限(月))
    },
    validateApprCounterGuarMeas (rule, value, callback) {
      callback()
      // callback(请输入正确的批复反担保措施：枚举：01信用、02抵押、03质押、04个人保证、05企业保证，多选,逗号分隔)
    },
    validateApprCounterGuarMeasDesc (rule, value, callback) {
      callback()
      // callback(请输入正确的批复反担保措施说明)
    },
    validateApprGuarRate (rule, value, callback) {
      callback()
      // callback(请输入正确的年化担保费率（%/年）)
    },
    validateJkContrCode (rule, value, callback) {
      callback()
      // callback(请输入正确的借款合同编号)
    },
    validateJkContrAmount (rule, value, callback) {
      callback()
      // callback(请输入正确的借款合同金额)
    },
    validateJkCtrctTerm (rule, value, callback) {
      callback()
      // callback(请输入正确的借款合同期限（月）)
    },
    validateJkCtrctStartDate (rule, value, callback) {
      callback()
      // callback(请输入正确的借款合同开始日)
    },
    validateJkCtrctEndDate (rule, value, callback) {
      callback()
      // callback(请输入正确的借款合同到期日)
    },
    validateJkCtrctInterestRate (rule, value, callback) {
      callback()
      // callback(请输入正确的借款合同利率（年化%）,默认贷款利率，可以改)
    },
    validateIsSignMaxGuarCtrct (rule, value, callback) {
      callback()
      // callback(请输入正确的是否已签订最高额保证合同:0 否（单笔保证合同编号必填） 1 是)
    },
    validateSingleGuarCtrctCode (rule, value, callback) {
      callback()
      // callback(请输入正确的单笔保证合同编号)
    },
    validateGuarCtrctTerm (rule, value, callback) {
      callback()
      // callback(请输入正确的担保合同期限（月）)
    },
    validateWbCtrctCode (rule, value, callback) {
      callback()
      // callback(请输入正确的委保合同编号)
    },
    validateGuarCtrctCode (rule, value, callback) {
      callback()
      // callback(请输入正确的保证合同编号)
    },
    validateJkCtrctRemarks (rule, value, callback) {
      callback()
      // callback(请输入正确的备注说明)
    },
    validateJkCtrctCollection (rule, value, callback) {
      callback()
      // callback(请输入正确的合同合集 附件，根据批复反担保措施选项，抵押的话需要上传抵押合同，抵押质押的话，上传抵押质押合同，结果存储到附件表)
    },
    validateStatus (rule, value, callback) {
      callback()
      // callback(请输入正确的业务状态：10提报中、20审批中、30待签约、40待出函、50待放款、60已放款、90已作废)
    },
    validateIsDelete (rule, value, callback) {
      callback()
      // callback(请输入正确的逻辑删除: 1 已删除)
    },
    validateCreationUserId (rule, value, callback) {
      callback()
      // callback(请输入正确的创建人id)
    },
    validateCreationTime (rule, value, callback) {
      callback()
      // callback(请输入正确的创建时间)
    },
    validateLastModifiedUserId (rule, value, callback) {
      callback()
      // callback(请输入正确的最后修改人id)
    },
    validateLastModifiedTime (rule, value, callback) {
      callback()
      // callback(请输入正确的最后修改时间)
    },
    validateDeletionTime (rule, value, callback) {
      callback()
      // callback(请输入正确的删除人id)
    },
    validateDeletionUserId (rule, value, callback) {
      callback()
      // callback(请输入正确的删除时间)
    },
    validateWfTaskId (rule, value, callback) {
      callback()
      // callback(请输入正确的任务id)
    },
    validateWfInstId (rule, value, callback) {
      callback()
      // callback(请输入正确的工作流实例id)
    },
    validateWfTaskName (rule, value, callback) {
      callback()
      // callback(请输入正确的任务名称)
    },
    validateWfNodeId (rule, value, callback) {
      callback()
      // callback(请输入正确的节点id)
    },
    validateWfNodeName (rule, value, callback) {
      callback()
      // callback(请输入正确的节点名称)
    },
    validateCreateName (rule, value, callback) {
      callback()
      // callback(请输入正确的创建人名称)
    },
    validateUpdateName (rule, value, callback) {
      callback()
      // callback(请输入正确的修改人名称)
    },
    validateApprCounterGuarMeasCredit (rule, value, callback) {
      callback()
      // callback(请输入正确的批复反担保措施-信用)
    },
    validateApprCounterGuarMeasMortgage (rule, value, callback) {
      callback()
      // callback(请输入正确的批复反担保措施-抵押)
    },
    validateApprCounterGuarMeasPledge (rule, value, callback) {
      callback()
      // callback(请输入正确的批复反担保措施-质押)
    },
    validateApprCounterGuarMeasGuarantee (rule, value, callback) {
      callback()
      // callback(请输入正确的批复反担保措施-担保)
    },
    validateApprCounterGuarMeasByPro (rule, value, callback) {
      callback()
      // callback(请输入正确的批复反担保措施-以物抵债)
    },
    validateApprCounterGuarMeasOther (rule, value, callback) {
      callback()
      // callback(请输入正确的批复反担保措施-其他)
    },
    validateCounterGuarMeasCredit (rule, value, callback) {
      callback()
      // callback(请输入正确的申保反担保措施-信用)
    },
    validateCounterGuarMeasMortgage (rule, value, callback) {
      callback()
      // callback(请输入正确的申保反担保措施-抵押)
    },
    validateCounterGuarMeasPledge (rule, value, callback) {
      callback()
      // callback(请输入正确的申保反担保措施-质押)
    },
    validateCounterGuarMeasGuarantee (rule, value, callback) {
      callback()
      // callback(请输入正确的申保反担保措施-担保)
    },
    validateCounterGuarMeasByPro (rule, value, callback) {
      callback()
      // callback(请输入正确的申保反担保措施-以物抵债)
    },
    validateCounterGuarMeasOther (rule, value, callback) {
      callback()
      // callback(请输入正确的申保反担保措施-其他)
    },
    validateFinalResult (rule, value, callback) {
      callback()
      // callback(请输入正确的预审结果)
    },
    validateAuditImpl (rule, value, callback) {
      callback()
      // callback(请输入正确的审批条件是否已落实)
    },
    validateLawImpl (rule, value, callback) {
      callback()
      // callback(请输入正确的法律文件是否已完善)
    },
    validateFeePay (rule, value, callback) {
      callback()
      // callback(请输入正确的保费是否缴纳)
    }
  }
}
</script>
