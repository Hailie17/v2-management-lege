<template>
  <div class="tags">
    <el-tag class="tag" closable size="medium" v-for="item in tags" :key="item.path" :effect="item.title === $route.meta.title[$route.meta.title.length - 1] ? 'dark' : 'plain'">
      {{ item.title }}</el-tag>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tags: [{
        title: '首页',
        path: '/home'
      }]
    }
  },
  watch: {
    $route: {
      immediate: true, // 立即监听
      handler (val, oldVal) {
        const bool = this.tags.find(item => {
          return item.path === val.path
        })
        if (!bool) {
          this.tags.push({
            title: val.meta.title[val.meta.title.length - 1],
            path: val.path
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tags {
  padding-top: 4px;
  padding-left: 20px;
  .tag {
    margin-right: 5px;
  }
}
</style>
