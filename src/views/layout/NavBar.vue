<template>
  <div class="navbar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      :collapse="isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航3</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">选项3</el-menu-item>
          <el-menu-item index="3-2">选项4</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.navCollapse.isCollapse
    })
  }
}
</script>

<style lang="less" scoped>
  .navbar {
    width: 220px;
    height: 100%;
    position: relative;
    background-color: #304156;
    box-shadow: 5px 0 5px #ddd;
    .el-menu {
      border: none;
    }
  }
</style>
