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
            <a-descriptions v-if="this.model" title="数据字典值表">
    <a-descriptions-item label="字典编码">{{model.dictCode}}</a-descriptions-item>
    <a-descriptions-item label="字典值编码">{{model.code}}</a-descriptions-item>
    <a-descriptions-item label="字典值">{{model.value}}</a-descriptions-item>
    <a-descriptions-item label="父字典值编码">{{model.parentDictValueCode}}</a-descriptions-item>
    <a-descriptions-item label="排序">{{model.orderBy}}</a-descriptions-item>
    <a-descriptions-item label="扩展字段a">{{model.extA}}</a-descriptions-item>
    <a-descriptions-item label="扩展字段b">{{model.extB}}</a-descriptions-item>
    <a-descriptions-item label="状态">{{model.enable}}</a-descriptions-item>
            </a-descriptions>
        </a-spin>

    </a-modal>
</template>

<script>
    import pick from 'lodash.pick'
    // 表单字段
    const fields = [
                'id',
                'dictCode',
                'code',
                'value',
                'parentDictValueCode',
                'orderBy',
                'extA',
                'extB',
                'enable',
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
            validateDictCode(rule, value, callback) {
                callback()
                //callback(请输入正确的字典编码)
            },
            validateCode(rule, value, callback) {
                callback()
                //callback(请输入正确的字典值编码)
            },
            validateValue(rule, value, callback) {
                callback()
                //callback(请输入正确的字典值)
            },
            validateParentDictValueCode(rule, value, callback) {
                callback()
                //callback(请输入正确的父字典值编码)
            },
            validateOrderBy(rule, value, callback) {
                callback()
                //callback(请输入正确的排序)
            },
            validateExtA(rule, value, callback) {
                callback()
                //callback(请输入正确的扩展字段a)
            },
            validateExtB(rule, value, callback) {
                callback()
                //callback(请输入正确的扩展字段b)
            },
            validateEnable(rule, value, callback) {
                callback()
                //callback(请输入正确的状态)
            },
        }

    }
</script>
