<template>
  <div>
    <a-form>
      <div v-if="loading">
        <a-result status="success" :title="'导入中'">
          <template #icon>
            <a-spin />
          </template>
          <template #subTitle>
            <div>请耐心等待...</div>
          </template>
          <template #extra>
            <!-- <a-button key="okBtn" type="primary" @click="handleModalOk">
                确定
              </a-button> -->
          </template>
        </a-result>
        <!-- <p><a-spin />报文生成中...</p> -->
      </div>
      <a-result
        v-else
        :title=" success? '操作成功':'导入失败'"
        :status="success? 'success':'error'"
        sub-title="共创建n个模型"
        style="max-width: 560px; margin: 40px auto 0;">
        <!-- <div class="information">
          <a-row>
            <a-col :sm="8" :xs="24">付款账户：</a-col>
            <a-col :sm="16" :xs="24">ant-design@alipay.com</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">收款账户：</a-col>
            <a-col :sm="16" :xs="24">test@example.com</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">收款人姓名：</a-col>
            <a-col :sm="16" :xs="24">辉夜</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">转账金额：</a-col>
            <a-col :sm="16" :xs="24"><span class="money">500</span> 元</a-col>
          </a-row>
        </div> -->

        <template #extra>
          <a-button type="primary" @click="finish">完成</a-button>
          <!-- <a-button style="margin-left: 8px" @click="toOrderList">查看账单</a-button> -->
        </template>
      </a-result>
    </a-form>
  </div>
</template>

<script>
import { importFromDb } from '../api'
export default {
  name: 'Step3',
  props: {
    value: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      loading: true,
      success: true
    }
  },
  mounted () {
    this.importModel()
  },
  methods: {
    importModel () {
      console.log('import model::', this.value)
      importFromDb(this.value)
        .then((res) => {
          this.$message.success('导入成功')
          this.loading = false
        })
        .catch((err) => {
          console.error(err)
          this.$message.error('导入失败')
          this.loading = false
        })
    },
    finish () {
      this.$emit('finish')
    }
  }
}
</script>
<style lang="less" scoped>
.information {
  line-height: 22px;

  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}
.money {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 14px;
}
</style>
