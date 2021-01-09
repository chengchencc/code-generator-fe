<template>
  <div>
    <div class="text-left">
      <a-row>
        <a-button type="primary" @click="downloadReport">下载报告</a-button>
      </a-row>
    </div>
    <div v-if="url" class="full-content">
      <iframe class="full-iframe" :src="url"></iframe>
    </div>
  </div>
</template>

<script>
import { getFileByFileId, downLoadByFileId } from '@/api/common'
export default {
  props: {
    fileId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      url: ''
    }
  },
  mounted () {
    getFileByFileId(this.fileId).then(res => {
      if (res.endsWith('.pdf')) {
        this.url = '/api-file' + res
      } else {
        this.url = '/kkfileview/onlinePreview?url=' + encodeURIComponent(window.location.origin + '/api-file' + res)
      }
    })
  },
  methods: {
    downloadReport () {
      downLoadByFileId(this.fileId).then((response) => { // '7e0f10c135f04e8294b481e1acd92271'
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        // 获取文件名
        const contentDisposition = response.headers['content-disposition']
        let fileName = 'unknown'
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename=(.+)/)
          if (fileNameMatch.length === 2) fileName = fileNameMatch[1]
        }
        fileName = decodeURIComponent(fileName)
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
      })
    }
  },
}
</script>

<style lang="less" scoped>
.full-content {
  height: calc(100vh - 286px);
  margin: -10px;
}

.text-left {
  margin-bottom: 20px;
}

.full-iframe {
  height: 100%;
  width: 100%;
  border-style: none;
}
</style>