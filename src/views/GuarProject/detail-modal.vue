<template>
    <a-modal
            :title="title"
            :width="640"
            :visible="visible"
            :confirmLoading="loading"
            @ok="handleOk"
            @cancel="handleCancel"
    >
        <a-spin :spinning="loading">
            <a-descriptions v-if="this.model" title="项目基础信息表">
    <a-descriptions-item label="项目编号：年月日4位流水号，201010140001">{{model.code}}</a-descriptions-item>
    <a-descriptions-item label="项目来源：银行直报 01、公司受理 02">{{model.source}}</a-descriptions-item>
    <a-descriptions-item label="所属省">{{model.province}}</a-descriptions-item>
    <a-descriptions-item label="所属地市">{{model.city}}</a-descriptions-item>
    <a-descriptions-item label="所属区县">{{model.districts}}</a-descriptions-item>
    <a-descriptions-item label="主体类型：自然人01、法人02">{{model.mainType}}</a-descriptions-item>
    <a-descriptions-item label="客户类型:来源数据字典">{{model.custType}}</a-descriptions-item>
    <a-descriptions-item label="客户编号">{{model.custId}}</a-descriptions-item>
    <a-descriptions-item label="客户名称：自然人对应姓名，非自然人对应组织全称。">{{model.custName}}</a-descriptions-item>
    <a-descriptions-item label="证件号码:身份证号或统一社会信用代码">{{model.identityNo}}</a-descriptions-item>
    <a-descriptions-item label="联系电话">{{model.mobile}}</a-descriptions-item>
    <a-descriptions-item label="国家农担分类">{{model.standardGuarType}}</a-descriptions-item>
    <a-descriptions-item label="国民经济分类">{{model.nationalEconomyType}}</a-descriptions-item>
    <a-descriptions-item label="经营主业">{{model.mainBusiness}}</a-descriptions-item>
    <a-descriptions-item label="项目分类:首保项目、续保项目、续保增额">{{model.projectType}}</a-descriptions-item>
    <a-descriptions-item label="项目类型:产业集群/产业链、普通项目、灾后重建、财政补贴、低风险类、担保产品">{{model.projectCatagory}}</a-descriptions-item>
    <a-descriptions-item label="申保金额(万元)">{{model.guarApplyAmount}}</a-descriptions-item>
    <a-descriptions-item label="申保期限(月)">{{model.guarApplyPeriod}}</a-descriptions-item>
    <a-descriptions-item label="申保反担保措施：信用、抵押、质押、个人保证、企业保证">{{model.counterGuarMeas}}</a-descriptions-item>
    <a-descriptions-item label="申保反担保措施说明">{{model.counterGuarMeasDesc}}</a-descriptions-item>
    <a-descriptions-item label="贷款方式：01 普通贷款、02 循环贷（随借随还）">{{model.loanType}}</a-descriptions-item>
    <a-descriptions-item label="担保方式: 01 一般保证、02 连带责任保证">{{model.guarType}}</a-descriptions-item>
    <a-descriptions-item label="还款方式:普通贷款时，必填。分期付息到期还本、利随本清、等额本金、等额本息">{{model.loanRepaymentMethod}}</a-descriptions-item>
    <a-descriptions-item label="贷款利率（年化%）">{{model.loanInterestRate}}</a-descriptions-item>
    <a-descriptions-item label="借款用途：供风险分析使用(500字以内)">{{model.moneyPurpose}}</a-descriptions-item>
    <a-descriptions-item label="担保产品：数据字典（担保产品标签）">{{model.productWarranty}}</a-descriptions-item>
    <a-descriptions-item label="集群方案：项目类型为产业集群时，数据字典">{{model.aggregateScheme}}</a-descriptions-item>
    <a-descriptions-item label="是否首贷：1 是、0 否，财农〔2020〕15号要求。建议以征信报">{{model.isFirstLoans}}</a-descriptions-item>
    <a-descriptions-item label="是否首保：1 是、0 否，首次办理惠农贷业务视作首保。">{{model.isFirstMaintenance}}</a-descriptions-item>
    <a-descriptions-item label="是否扶贫：1 是、0 否，扶贫政策类业务标记。">{{model.isPovertyRelief}}</a-descriptions-item>
    <a-descriptions-item label="贷款银行全称：精确到支行的银行全称（机构字典）不能改。">{{model.loansBank}}</a-descriptions-item>
    <a-descriptions-item label="银行客户经理:默认提报人">{{model.bankCustManagerId}}</a-descriptions-item>
    <a-descriptions-item label="银行客户经理:默认提报人">{{model.bankCustManagerName}}</a-descriptions-item>
    <a-descriptions-item label="银行客户经理联系方式">{{model.bankCustManagerMobile}}</a-descriptions-item>
    <a-descriptions-item label="银行尽调报告和审批结论 附件">{{model.bankApplyAssert}}</a-descriptions-item>
    <a-descriptions-item label="审批必备资料 附件（固定19个附件）">{{model.applyAssert}}</a-descriptions-item>
    <a-descriptions-item label="备注">{{model.remark}}</a-descriptions-item>
    <a-descriptions-item label="市管补充资料,附件">{{model.cityManagerSupplyAssert}}</a-descriptions-item>
    <a-descriptions-item label="担保批复编号">{{model.apprCode}}</a-descriptions-item>
    <a-descriptions-item label="放款通知编号">{{model.loanCode}}</a-descriptions-item>
    <a-descriptions-item label="担保批复日期">{{model.apprDate}}</a-descriptions-item>
    <a-descriptions-item label="担保批复金额(万元)">{{model.apprAmount}}</a-descriptions-item>
    <a-descriptions-item label="担保批复期限(月)">{{model.apprPeriod}}</a-descriptions-item>
    <a-descriptions-item label="批复反担保措施：枚举：01信用、02抵押、03质押、04个人保证、05企业保证，多选,逗号分隔">{{model.apprCounterGuarMeas}}</a-descriptions-item>
    <a-descriptions-item label="批复反担保措施说明">{{model.apprCounterGuarMeasDesc}}</a-descriptions-item>
    <a-descriptions-item label="年化担保费率（%/年）">{{model.apprGuarRate}}</a-descriptions-item>
    <a-descriptions-item label="借款合同编号">{{model.jkContrCode}}</a-descriptions-item>
    <a-descriptions-item label="借款合同金额">{{model.jkContrAmount}}</a-descriptions-item>
    <a-descriptions-item label="借款合同期限（月）">{{model.jkCtrctTerm}}</a-descriptions-item>
    <a-descriptions-item label="借款合同开始日">{{model.jkCtrctStartDate}}</a-descriptions-item>
    <a-descriptions-item label="借款合同到期日">{{model.jkCtrctEndDate}}</a-descriptions-item>
    <a-descriptions-item label="借款合同利率（年化%）,默认贷款利率，可以改">{{model.jkCtrctInterestRate}}</a-descriptions-item>
    <a-descriptions-item label="是否已签订最高额保证合同:0 否（单笔保证合同编号必填） 1 是">{{model.isSignMaxGuarCtrct}}</a-descriptions-item>
    <a-descriptions-item label="单笔保证合同编号">{{model.singleGuarCtrctCode}}</a-descriptions-item>
    <a-descriptions-item label="担保合同期限（月）">{{model.guarCtrctTerm}}</a-descriptions-item>
    <a-descriptions-item label="委保合同编号">{{model.wbCtrctCode}}</a-descriptions-item>
    <a-descriptions-item label="保证合同编号">{{model.guarCtrctCode}}</a-descriptions-item>
    <a-descriptions-item label="备注说明">{{model.jkCtrctRemarks}}</a-descriptions-item>
    <a-descriptions-item label="合同合集 附件，根据批复反担保措施选项，抵押的话需要上传抵押合同，抵押质押的话，上传抵押质押合同，结果存储到附件表">{{model.jkCtrctCollection}}</a-descriptions-item>
    <a-descriptions-item label="业务状态：10提报中、20审批中、30待签约、40待出函、50待放款、60已放款、90已作废">{{model.status}}</a-descriptions-item>
    <a-descriptions-item label="逻辑删除: 1 已删除">{{model.isDelete}}</a-descriptions-item>
    <a-descriptions-item label="创建人id">{{model.creationUserId}}</a-descriptions-item>
    <a-descriptions-item label="创建时间">{{model.creationTime}}</a-descriptions-item>
    <a-descriptions-item label="最后修改人id">{{model.lastModifiedUserId}}</a-descriptions-item>
    <a-descriptions-item label="最后修改时间">{{model.lastModifiedTime}}</a-descriptions-item>
    <a-descriptions-item label="删除人id">{{model.deletionTime}}</a-descriptions-item>
    <a-descriptions-item label="删除时间">{{model.deletionUserId}}</a-descriptions-item>
    <a-descriptions-item label="任务id">{{model.wfTaskId}}</a-descriptions-item>
    <a-descriptions-item label="工作流实例id">{{model.wfInstId}}</a-descriptions-item>
    <a-descriptions-item label="任务名称">{{model.wfTaskName}}</a-descriptions-item>
    <a-descriptions-item label="节点id">{{model.wfNodeId}}</a-descriptions-item>
    <a-descriptions-item label="节点名称">{{model.wfNodeName}}</a-descriptions-item>
    <a-descriptions-item label="创建人名称">{{model.createName}}</a-descriptions-item>
    <a-descriptions-item label="修改人名称">{{model.updateName}}</a-descriptions-item>
    <a-descriptions-item label="批复反担保措施-信用">{{model.apprCounterGuarMeasCredit}}</a-descriptions-item>
    <a-descriptions-item label="批复反担保措施-抵押">{{model.apprCounterGuarMeasMortgage}}</a-descriptions-item>
    <a-descriptions-item label="批复反担保措施-质押">{{model.apprCounterGuarMeasPledge}}</a-descriptions-item>
    <a-descriptions-item label="批复反担保措施-担保">{{model.apprCounterGuarMeasGuarantee}}</a-descriptions-item>
    <a-descriptions-item label="批复反担保措施-以物抵债">{{model.apprCounterGuarMeasByPro}}</a-descriptions-item>
    <a-descriptions-item label="批复反担保措施-其他">{{model.apprCounterGuarMeasOther}}</a-descriptions-item>
    <a-descriptions-item label="申保反担保措施-信用">{{model.counterGuarMeasCredit}}</a-descriptions-item>
    <a-descriptions-item label="申保反担保措施-抵押">{{model.counterGuarMeasMortgage}}</a-descriptions-item>
    <a-descriptions-item label="申保反担保措施-质押">{{model.counterGuarMeasPledge}}</a-descriptions-item>
    <a-descriptions-item label="申保反担保措施-担保">{{model.counterGuarMeasGuarantee}}</a-descriptions-item>
    <a-descriptions-item label="申保反担保措施-以物抵债">{{model.counterGuarMeasByPro}}</a-descriptions-item>
    <a-descriptions-item label="申保反担保措施-其他">{{model.counterGuarMeasOther}}</a-descriptions-item>
    <a-descriptions-item label="预审结果">{{model.finalResult}}</a-descriptions-item>
    <a-descriptions-item label="审批条件是否已落实">{{model.auditImpl}}</a-descriptions-item>
    <a-descriptions-item label="法律文件是否已完善">{{model.lawImpl}}</a-descriptions-item>
    <a-descriptions-item label="保费是否缴纳">{{model.feePay}}</a-descriptions-item>
            </a-descriptions>
        </a-spin>

    </a-modal>
</template>

<script>
    import pick from 'lodash.pick'
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
                'feePay',
    ]

    export default {
        props: {
            visible: {
                type: Boolean,
                required: true
            },
            loading: {
                type: Boolean,
                default: () => false
            },
            model: {
                type: Object,
                default: () => null
            }
        },
        data() {
            return {
                title: '详情',
                columm: { xs: 8, sm: 8, md: 8, lg: 4 }
            }
        },
        beforeCreate() {
        },
        created() {
            console.log('custom modal created')

            // 当 model 发生改变时，为表单设置值
            this.$watch('model', () => {
                console.log('model change', this.model)
                this.model && pick(this.model, fields)
            })
        },
        mounted(){
            // vue 生命周期钩子，已完成模板渲染，此处可以进行dom操作
        },
        methods: {
            handleOk () {
                this.$emit('cancel')
            },
            handleCancel () {
                this.$emit('cancel')
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
            validateCode(rule, value, callback) {
                callback()
                //callback(请输入正确的项目编号：年月日4位流水号，201010140001)
            },
            validateSource(rule, value, callback) {
                callback()
                //callback(请输入正确的项目来源：银行直报 01、公司受理 02)
            },
            validateProvince(rule, value, callback) {
                callback()
                //callback(请输入正确的所属省)
            },
            validateCity(rule, value, callback) {
                callback()
                //callback(请输入正确的所属地市)
            },
            validateDistricts(rule, value, callback) {
                callback()
                //callback(请输入正确的所属区县)
            },
            validateMainType(rule, value, callback) {
                callback()
                //callback(请输入正确的主体类型：自然人01、法人02)
            },
            validateCustType(rule, value, callback) {
                callback()
                //callback(请输入正确的客户类型:来源数据字典)
            },
            validateCustId(rule, value, callback) {
                callback()
                //callback(请输入正确的客户编号)
            },
            validateCustName(rule, value, callback) {
                callback()
                //callback(请输入正确的客户名称：自然人对应姓名，非自然人对应组织全称。)
            },
            validateIdentityNo(rule, value, callback) {
                callback()
                //callback(请输入正确的证件号码:身份证号或统一社会信用代码)
            },
            validateMobile(rule, value, callback) {
                callback()
                //callback(请输入正确的联系电话)
            },
            validateStandardGuarType(rule, value, callback) {
                callback()
                //callback(请输入正确的国家农担分类)
            },
            validateNationalEconomyType(rule, value, callback) {
                callback()
                //callback(请输入正确的国民经济分类)
            },
            validateMainBusiness(rule, value, callback) {
                callback()
                //callback(请输入正确的经营主业)
            },
            validateProjectType(rule, value, callback) {
                callback()
                //callback(请输入正确的项目分类:首保项目、续保项目、续保增额)
            },
            validateProjectCatagory(rule, value, callback) {
                callback()
                //callback(请输入正确的项目类型:产业集群/产业链、普通项目、灾后重建、财政补贴、低风险类、担保产品)
            },
            validateGuarApplyAmount(rule, value, callback) {
                callback()
                //callback(请输入正确的申保金额(万元))
            },
            validateGuarApplyPeriod(rule, value, callback) {
                callback()
                //callback(请输入正确的申保期限(月))
            },
            validateCounterGuarMeas(rule, value, callback) {
                callback()
                //callback(请输入正确的申保反担保措施：信用、抵押、质押、个人保证、企业保证)
            },
            validateCounterGuarMeasDesc(rule, value, callback) {
                callback()
                //callback(请输入正确的申保反担保措施说明)
            },
            validateLoanType(rule, value, callback) {
                callback()
                //callback(请输入正确的贷款方式：01 普通贷款、02 循环贷（随借随还）)
            },
            validateGuarType(rule, value, callback) {
                callback()
                //callback(请输入正确的担保方式: 01 一般保证、02 连带责任保证)
            },
            validateLoanRepaymentMethod(rule, value, callback) {
                callback()
                //callback(请输入正确的还款方式:普通贷款时，必填。分期付息到期还本、利随本清、等额本金、等额本息)
            },
            validateLoanInterestRate(rule, value, callback) {
                callback()
                //callback(请输入正确的贷款利率（年化%）)
            },
            validateMoneyPurpose(rule, value, callback) {
                callback()
                //callback(请输入正确的借款用途：供风险分析使用(500字以内))
            },
            validateProductWarranty(rule, value, callback) {
                callback()
                //callback(请输入正确的担保产品：数据字典（担保产品标签）)
            },
            validateAggregateScheme(rule, value, callback) {
                callback()
                //callback(请输入正确的集群方案：项目类型为产业集群时，数据字典)
            },
            validateIsFirstLoans(rule, value, callback) {
                callback()
                //callback(请输入正确的是否首贷：1 是、0 否，财农〔2020〕15号要求。建议以征信报)
            },
            validateIsFirstMaintenance(rule, value, callback) {
                callback()
                //callback(请输入正确的是否首保：1 是、0 否，首次办理惠农贷业务视作首保。)
            },
            validateIsPovertyRelief(rule, value, callback) {
                callback()
                //callback(请输入正确的是否扶贫：1 是、0 否，扶贫政策类业务标记。)
            },
            validateLoansBank(rule, value, callback) {
                callback()
                //callback(请输入正确的贷款银行全称：精确到支行的银行全称（机构字典）不能改。)
            },
            validateBankCustManagerId(rule, value, callback) {
                callback()
                //callback(请输入正确的银行客户经理:默认提报人)
            },
            validateBankCustManagerName(rule, value, callback) {
                callback()
                //callback(请输入正确的银行客户经理:默认提报人)
            },
            validateBankCustManagerMobile(rule, value, callback) {
                callback()
                //callback(请输入正确的银行客户经理联系方式)
            },
            validateBankApplyAssert(rule, value, callback) {
                callback()
                //callback(请输入正确的银行尽调报告和审批结论 附件)
            },
            validateApplyAssert(rule, value, callback) {
                callback()
                //callback(请输入正确的审批必备资料 附件（固定19个附件）)
            },
            validateRemark(rule, value, callback) {
                callback()
                //callback(请输入正确的备注)
            },
            validateCityManagerSupplyAssert(rule, value, callback) {
                callback()
                //callback(请输入正确的市管补充资料,附件)
            },
            validateApprCode(rule, value, callback) {
                callback()
                //callback(请输入正确的担保批复编号)
            },
            validateLoanCode(rule, value, callback) {
                callback()
                //callback(请输入正确的放款通知编号)
            },
            validateApprDate(rule, value, callback) {
                callback()
                //callback(请输入正确的担保批复日期)
            },
            validateApprAmount(rule, value, callback) {
                callback()
                //callback(请输入正确的担保批复金额(万元))
            },
            validateApprPeriod(rule, value, callback) {
                callback()
                //callback(请输入正确的担保批复期限(月))
            },
            validateApprCounterGuarMeas(rule, value, callback) {
                callback()
                //callback(请输入正确的批复反担保措施：枚举：01信用、02抵押、03质押、04个人保证、05企业保证，多选,逗号分隔)
            },
            validateApprCounterGuarMeasDesc(rule, value, callback) {
                callback()
                //callback(请输入正确的批复反担保措施说明)
            },
            validateApprGuarRate(rule, value, callback) {
                callback()
                //callback(请输入正确的年化担保费率（%/年）)
            },
            validateJkContrCode(rule, value, callback) {
                callback()
                //callback(请输入正确的借款合同编号)
            },
            validateJkContrAmount(rule, value, callback) {
                callback()
                //callback(请输入正确的借款合同金额)
            },
            validateJkCtrctTerm(rule, value, callback) {
                callback()
                //callback(请输入正确的借款合同期限（月）)
            },
            validateJkCtrctStartDate(rule, value, callback) {
                callback()
                //callback(请输入正确的借款合同开始日)
            },
            validateJkCtrctEndDate(rule, value, callback) {
                callback()
                //callback(请输入正确的借款合同到期日)
            },
            validateJkCtrctInterestRate(rule, value, callback) {
                callback()
                //callback(请输入正确的借款合同利率（年化%）,默认贷款利率，可以改)
            },
            validateIsSignMaxGuarCtrct(rule, value, callback) {
                callback()
                //callback(请输入正确的是否已签订最高额保证合同:0 否（单笔保证合同编号必填） 1 是)
            },
            validateSingleGuarCtrctCode(rule, value, callback) {
                callback()
                //callback(请输入正确的单笔保证合同编号)
            },
            validateGuarCtrctTerm(rule, value, callback) {
                callback()
                //callback(请输入正确的担保合同期限（月）)
            },
            validateWbCtrctCode(rule, value, callback) {
                callback()
                //callback(请输入正确的委保合同编号)
            },
            validateGuarCtrctCode(rule, value, callback) {
                callback()
                //callback(请输入正确的保证合同编号)
            },
            validateJkCtrctRemarks(rule, value, callback) {
                callback()
                //callback(请输入正确的备注说明)
            },
            validateJkCtrctCollection(rule, value, callback) {
                callback()
                //callback(请输入正确的合同合集 附件，根据批复反担保措施选项，抵押的话需要上传抵押合同，抵押质押的话，上传抵押质押合同，结果存储到附件表)
            },
            validateStatus(rule, value, callback) {
                callback()
                //callback(请输入正确的业务状态：10提报中、20审批中、30待签约、40待出函、50待放款、60已放款、90已作废)
            },
            validateIsDelete(rule, value, callback) {
                callback()
                //callback(请输入正确的逻辑删除: 1 已删除)
            },
            validateCreationUserId(rule, value, callback) {
                callback()
                //callback(请输入正确的创建人id)
            },
            validateCreationTime(rule, value, callback) {
                callback()
                //callback(请输入正确的创建时间)
            },
            validateLastModifiedUserId(rule, value, callback) {
                callback()
                //callback(请输入正确的最后修改人id)
            },
            validateLastModifiedTime(rule, value, callback) {
                callback()
                //callback(请输入正确的最后修改时间)
            },
            validateDeletionTime(rule, value, callback) {
                callback()
                //callback(请输入正确的删除人id)
            },
            validateDeletionUserId(rule, value, callback) {
                callback()
                //callback(请输入正确的删除时间)
            },
            validateWfTaskId(rule, value, callback) {
                callback()
                //callback(请输入正确的任务id)
            },
            validateWfInstId(rule, value, callback) {
                callback()
                //callback(请输入正确的工作流实例id)
            },
            validateWfTaskName(rule, value, callback) {
                callback()
                //callback(请输入正确的任务名称)
            },
            validateWfNodeId(rule, value, callback) {
                callback()
                //callback(请输入正确的节点id)
            },
            validateWfNodeName(rule, value, callback) {
                callback()
                //callback(请输入正确的节点名称)
            },
            validateCreateName(rule, value, callback) {
                callback()
                //callback(请输入正确的创建人名称)
            },
            validateUpdateName(rule, value, callback) {
                callback()
                //callback(请输入正确的修改人名称)
            },
            validateApprCounterGuarMeasCredit(rule, value, callback) {
                callback()
                //callback(请输入正确的批复反担保措施-信用)
            },
            validateApprCounterGuarMeasMortgage(rule, value, callback) {
                callback()
                //callback(请输入正确的批复反担保措施-抵押)
            },
            validateApprCounterGuarMeasPledge(rule, value, callback) {
                callback()
                //callback(请输入正确的批复反担保措施-质押)
            },
            validateApprCounterGuarMeasGuarantee(rule, value, callback) {
                callback()
                //callback(请输入正确的批复反担保措施-担保)
            },
            validateApprCounterGuarMeasByPro(rule, value, callback) {
                callback()
                //callback(请输入正确的批复反担保措施-以物抵债)
            },
            validateApprCounterGuarMeasOther(rule, value, callback) {
                callback()
                //callback(请输入正确的批复反担保措施-其他)
            },
            validateCounterGuarMeasCredit(rule, value, callback) {
                callback()
                //callback(请输入正确的申保反担保措施-信用)
            },
            validateCounterGuarMeasMortgage(rule, value, callback) {
                callback()
                //callback(请输入正确的申保反担保措施-抵押)
            },
            validateCounterGuarMeasPledge(rule, value, callback) {
                callback()
                //callback(请输入正确的申保反担保措施-质押)
            },
            validateCounterGuarMeasGuarantee(rule, value, callback) {
                callback()
                //callback(请输入正确的申保反担保措施-担保)
            },
            validateCounterGuarMeasByPro(rule, value, callback) {
                callback()
                //callback(请输入正确的申保反担保措施-以物抵债)
            },
            validateCounterGuarMeasOther(rule, value, callback) {
                callback()
                //callback(请输入正确的申保反担保措施-其他)
            },
            validateFinalResult(rule, value, callback) {
                callback()
                //callback(请输入正确的预审结果)
            },
            validateAuditImpl(rule, value, callback) {
                callback()
                //callback(请输入正确的审批条件是否已落实)
            },
            validateLawImpl(rule, value, callback) {
                callback()
                //callback(请输入正确的法律文件是否已完善)
            },
            validateFeePay(rule, value, callback) {
                callback()
                //callback(请输入正确的保费是否缴纳)
            },
        }

    }
</script>
