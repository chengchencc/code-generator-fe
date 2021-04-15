
<template>
    <a-spin :spinning="loading">
        <a-form :form="form" v-bind="formLayout">
          <a-row :gutter="26" :style="rowStyle">
            <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->



                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="作者" v-bind="colInfo12">
                                    <a-input v-decorator="['authorName',validatorRules.authorName ]" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="作者邮箱" v-bind="colInfo12">
                                    <a-input v-decorator="['email',validatorRules.email ]" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="模块名" v-bind="colInfo12">
                                    <a-input v-decorator="['moduleName',validatorRules.moduleName ]" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="包名" v-bind="colInfo12">
                                <a-input v-decorator="['packageName',validatorRules.packageName ]" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="模板" v-bind="colInfo12">
                                <a-input v-decorator="['uiTemplate',validatorRules.uiTemplate ]" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="创建时间" v-bind="colInfo12">
                                    <a-date-picker v-decorator="['creationTime',validatorRules.creationTime ]" style="width: 100%" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="创建者" v-bind="colInfo12">
                                    <a-input v-decorator="['creationUserId',validatorRules.creationUserId ]" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="删除时间" v-bind="colInfo12">
                                    <a-date-picker v-decorator="['deletionTime',validatorRules.deletionTime ]" format="YYYY-MM-DD HH:mm:ss" show-time style="width: 100%" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="删除人" v-bind="colInfo12">
                                    <a-input v-decorator="['deletionUserId',validatorRules.deletionUserId ]" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="最后修改时间" v-bind="colInfo12">
                                    <a-date-picker v-decorator="['lastModifyTime',validatorRules.lastModifyTime ]" style="width: 100%" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="最后修改人" v-bind="colInfo12">
                                    <a-input v-decorator="['lastModifyUserId',validatorRules.lastModifyUserId ]" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12" :style="colStyle">
                            <a-form-item label="租户Id" v-bind="colInfo12">
                                    <a-input v-decorator="['tenantId',validatorRules.tenantId ]" :disabled="unEditable"/>
                            </a-form-item>
                        </a-col>


           </a-row>
        </a-form>
    </a-spin>
</template>

<script>
    import pick from 'lodash.pick'
    import { httpGet, httpPost, httpDelete, httpPut, downFile } from '@/utils/httpClient'
    import { getDictionaryByCodes } from '@/utils/dictUtil'
    import FileUploadMixin from '@/core/mixins/FileUploadMixin'
    import FormMixin from '@/core/mixins/FormMixin'
    import { dictMixin } from '@/store/dict-mixin'
    import storage from 'store'


    // 表单字段
    // const fields = ['id', 'dictCode', 'code', 'value', 'parentDictValueCode', 'orderBy', 'extA', 'extB', 'enable']
    const fields = [
        'id',
        'authorName',
        'email',
        'moduleName',
        'packageName',
        'uiTemplate',
        'creationTime',
        'creationUserId',
        'deletionTime',
        'deletionUserId',
        'lastModifyTime',
        'lastModifyUserId',
        'tenantId',
    ]

    const StringToArrFields = []

    export default {
        props: ['unEditable'],
        mixins: [FileUploadMixin, FormMixin, dictMixin],
        data () {
            return {
                district: null,
                uploadApi: '/api-file/files/upload',
                headers: {
                  Authorization: `Bearer ${storage.get('Access-Token')}`,
                },
                model: {},
                loading: false,
                // 布局
                formLayout: {
                    labelCol: {
                        xs: { span: 24 },
                        sm: { span: 5 },
                        md: { span: 5 },
                        lg: { span: 5 },
                        xl: { span: 5 },
                        xxl: { span: 5 }
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 16 },
                        md: { span: 16 },
                        lg: { span: 16 },
                        xl: { span: 16 },
                        xxl: { span: 16 }
                    }
                },
                colInfo6: {
                  labelCol: { span: 12 },
                  wrapperCol: { span: 9 }
                },
                colInfo8: {
                  labelCol: { span: 9 },
                  wrapperCol: { span: 12 }
                },
                colInfo12: {
                  labelCol: { span: 6 },
                  wrapperCol: { span: 16 }
                },
                colInfo24: {
                  labelCol: { span: 3 },
                  wrapperCol: { span: 20 }
                },
                colStyle: 'padding: 0 !important',
                rowStyle: 'padding: 0 12px 0 12px !important',

                //页面级字典
                pageDict: {},
                validatorRules: {
                    id:{rules:[{required:true,message:"主键不能为空"},{ validator: this.validateId }]},
                    authorName:{rules:[{required:false,message:"作者不能为空"},{ validator: this.validateAuthorName }]},
                    email:{rules:[{required:false,message:"作者邮箱不能为空"},{ validator: this.validateEmail }]},
                    moduleName:{rules:[{required:false,message:"模块名不能为空"},{ validator: this.validateModuleName }]},
                    packageName:{rules:[{required:false,message:"包名不能为空"},{ validator: this.validatePackageName }]},
                    uiTemplate:{rules:[{required:false,message:"模板不能为空"},{ validator: this.validateUiTemplate }]},
                    creationTime:{rules:[{required:false,message:"创建时间不能为空"},{ validator: this.validateCreationTime }]},
                    creationUserId:{rules:[{required:false,message:"创建者不能为空"},{ validator: this.validateCreationUserId }]},
                    deletionTime:{rules:[{required:false,message:"删除时间不能为空"},{ validator: this.validateDeletionTime }]},
                    deletionUserId:{rules:[{required:false,message:"删除人不能为空"},{ validator: this.validateDeletionUserId }]},
                    lastModifyTime:{rules:[{required:false,message:"最后修改时间不能为空"},{ validator: this.validateLastModifyTime }]},
                    lastModifyUserId:{rules:[{required:false,message:"最后修改人不能为空"},{ validator: this.validateLastModifyUserId }]},
                    tenantId:{rules:[{required:false,message:"租户Id不能为空"},{ validator: this.validateTenantId }]},
                },
                urls: {
                    add: '/api-test/generatorRule',
                    edit: '/api-test/generatorRule'
                }
            }
        },
        beforeCreate () {},
        created () {
            console.log('custom modal created')
            // 初始化字典配置 在自己页面定义
            this.initDictConfig()
            this.form = this.$form.createForm(this)

            // 防止表单未注册
            fields.forEach((v) => this.form.getFieldDecorator(v))

            // 当 model 发生改变时，为表单设置值
            // this.$watch('model', () => {
            //   console.log('model change', this.model)
            //   this.model && this.form.setFieldsValue(pick(this.model, fields))
            // })
        },
        mounted () {
            // vue 生命周期钩子，已完成模板渲染，此处可以进行dom操作
        },
        methods: {
            initDictConfig(){},
            beforeUpload() {
              // 上传前 的图片校验等操作
              return true
            },
            normFile(e) {
              console.log('Upload event:', e);
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            },
            handleFileUpload(type, info) {
              console.log('上传组件状态改变', type, info)
              let fileList = [...info.fileList]
              // 2. read from response and show file link
              fileList = fileList
                .filter((item) => {
                  if (item.response && item.error) {
                    this.$message.error('文件上传失败')
                    return false
                  }
                  return true
                })
                .map((file) => {
                  if (file.response) {
                    // Component will show file.url as link
                    file.url = file.response.url
                    file.attFileType = type
                    file.attFileId = file.response.id
                    file.attFileName = file.name
                  }
                  return file
                })
            },
            handleChange () {
                console.log(arguments)
            },
            add () {
                this.edit({})
            },
            edit (record) {
                console.log('edit::', record)
                this.model = Object.assign({}, record)
                let newModel = JSON.parse(JSON.stringify(this.model));
                for(let i = 0 ; i<StringToArrFields.length ; i++) {
                  if( newModel.hasOwnProperty(StringToArrFields[i]) ){
                    newModel[StringToArrFields[i]] = newModel[StringToArrFields[i]] ? JSON.parse(newModel[StringToArrFields[i]]) : []
                  }
                }
                this.model = newModel;

                this.form.resetFields()
                this.$nextTick(() => {
                    this.model && this.form.setFieldsValue(pick(this.model, fields))
                })
            },

            submit () {
                // 触发表单验证
                this.form.validateFieldsAndScroll()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.loading = true
                        let formData = Object.assign(this.model, values)
                        for (let i = 0; i < StringToArrFields.length; i++) {
                          if (formData.hasOwnProperty(StringToArrFields[i]) && formData[StringToArrFields[i]]) {
                            formData[StringToArrFields[i]] = JSON.stringify(formData[StringToArrFields[i]])
                          }
                        }

                        let httpRequest = null
                        if (!this.model.id) {
                            httpRequest = httpPost(this.urls.add, formData)
                        } else {
                            httpRequest = httpPut(this.urls.edit, formData)
                        }
                        console.log('表单提交数据', formData)
                        httpRequest
                            .then(
                                (res) => {
                                    if (res.id) {
                                        this.$message.success("成功")
                                        this.$emit('ok')
                                    } else {
                                        this.$message.warning("异常")
                                    }
                                },
                                (err, con) => {
                                    this.$message.warning('保存失败！')
                                    console.log(err, con)
                                }
                            )
                            .finally(() => {
                                this.loading = false
                            })
                    }
                })
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
            validateId (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的主键')
            },
            validateAuthorName (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的作者')
            },
            validateEmail (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的作者邮箱')
            },
            validateModuleName (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的模块名')
            },
            validatePackageName (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的包名')
            },
            validateUiTemplate (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的模板')
            },
            validateCreationTime (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的创建时间')
            },
            validateCreationUserId (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的创建者')
            },
            validateDeletionTime (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的删除时间')
            },
            validateDeletionUserId (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的删除人')
            },
            validateLastModifyTime (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的最后修改时间')
            },
            validateLastModifyUserId (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的最后修改人')
            },
            validateTenantId (rule, value, callback) {
                callback()
                // callback('请输入正确的格式的租户Id')
            },

        }
    }
</script>
