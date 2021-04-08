<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item label="数据库类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select
          v-decorator="['dbType', { initialValue: 'MySql', rules: [{required: true, message: '数据库类型必须选择'}] }]">
          <a-select-option value="MySql">MySql</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="数据库连接" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['jdbcUrl', { initialValue: 'jdbc:mysql://81.70.161.37:3306/code-generator-sample?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&useSSL=false&zeroDateTimeBehavior=convertToNull&serverTimezone=Asia/Shanghai', rules: [{required: true, message: '必填'}] }]" />
      </a-form-item>
      <a-form-item label="登录用户" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['username', { initialValue: 'root', rules: [{required: true, message: '必填'}] }]" />
      </a-form-item>
      <a-form-item label="登录密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input type="password" v-decorator="['password', { initialValue: '1qaz@WSXcc123', rules: [{required: true, message: '必填'}] }]" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <p>输入数据库连接方式，可以基于数据库表结构导入数据模型
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step1',
  // inject: ['model'],
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    nextStep () {
      const {
        form: { validateFields }
      } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.$emit('nextStep', values)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, 0.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
