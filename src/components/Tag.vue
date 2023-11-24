<template>
  <div class="tags">
    <el-tag class="tag" @click="goTo(item.path)" @close="closeTag(index)" disable-transitions closable size="medium" v-for="(item, index) in tags" :key="item.path" :effect="item.title === $route.meta.title[$route.meta.title.length - 1] ? 'dark' : 'plain'">
      <i v-show="item.title === $route.meta.title[$route.meta.title.length - 1]" class="circle"></i>
      {{ item.title }}
    </el-tag>
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
  },
  methods: {
    goTo (path) {
      this.$router.push(path)
    },
    closeTag (i) {
      this.tags.splice(i, 1)
      this.$router.push(this.tags[this.tags.length - 1].path)
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
    .circle {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #fff;
      display: inline-block;
      margin-right: 3px;
    }
  }
}
</style>
