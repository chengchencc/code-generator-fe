import storage from 'store'

const FileUploadMixin = {
  data () {
    return {
      uploadApi: '/api-file/files/upload',
      headers: {
        Authorization: `Bearer ${storage.get('Access-Token')}`
      }
    }
  },
  computed: {
  },
  methods: {
    handlePreview (file) {
      let fileId = file.attFileId ? file.attFileId : file.response?.id
      fileId = fileId || file.uid
      const routeData = this.$router.resolve({
        path: `/file-preview/atta-preview/${fileId}`
      })
      window.open(routeData.href, '_blank')
    },
    handleFileChange (type, info) {
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
    }
  }
}

export default FileUploadMixin
