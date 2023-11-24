<template>
  <div class="crumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in title" :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import index from 'vuex'

export default {
  computed: {
    index () {
      return index
    }
  },
  data () {
    return {
      title: []
    }
  },
  watch: {
    $route: {
      immediate: true, // 刷新页面立即监听
      handler (val, oldVal) {
        this.title = this.$route.meta.title // this.$route当前路由
      }
    }
  }
}
</script>

<style lang="less" scoped>
.crumb .el-breadcrumb {
  line-height: 50px;
  font-size: 14px;
}
</style>
