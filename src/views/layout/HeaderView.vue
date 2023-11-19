<template>
  <div class="header">
    <el-button v-show="isShow" icon="el-icon-s-fold" @click="showMenu"></el-button>
    <el-button v-show="!isShow" icon="el-icon-s-unfold" @click="showMenu"></el-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    showMenu () {
      this.isShow = !this.isShow
      this.changeCollapse()
    },
    ...mapMutations({
      changeCollapse: 'navCollapse/changeCollapse'
    })
  }
}
</script>

<style lang="less" scoped>
  .header {
    height: 84px;
    box-shadow: 0 5px 5px #eee;
    button {
      width: 50px;
      height: 50px;
      margin: 0;
      font-size: 24px;
      padding: 12px 10px;
      border: none;
    }
  }
</style>
