<template>
  <div class="tag">
    <el-tag closable size="medium" v-for="item in tags" :key="item.path" :effect="item.isActive ? 'dark' : 'plain'">标签一</el-tag>
    <!--<el-tag closable size="medium" type="success">标签二</el-tag>-->
    <!--<el-tag closable size="medium" type="info">标签三</el-tag>-->
    <!--<el-tag closable size="medium" type="warning">标签四</el-tag>-->
    <!--<el-tag closable size="medium" type="danger">标签五</el-tag>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      tags: [{
        title: '首页',
        path: '/home',
        isActive: false
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.tag {
  padding-top: 4px;
  padding-left: 20px;
}
</style>
