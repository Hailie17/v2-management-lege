<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { BpmnInfoApi } from '@/request/api'
export default {
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    async submitUpload () {
      const file = this.fileList[0].raw
      console.log(this.fileList[0], file, 999)
      const res = await BpmnInfoApi({
        file: file,
        bpmnLabel: file.name,
        bpmnType: 'casual-leave',
        info: '测试上传接口'
      }, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (!res) return false
      this.$message.success(res.msg)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      this.fileList = fileList
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
