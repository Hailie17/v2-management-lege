<template>
  <div class="navbar" :class="{ isColl : isCollapse}">
    <h1 class="main-logo">
      <img src="../../assets/logo.png" alt="" width="24">
      <span v-show="!isCollapse">通用后台管理系统</span>
    </h1>
    <el-menu
      :router="true"
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      :collapse="isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
      active-text-color="#ffd04b">
      <div v-for="(item, idx) in menuData" :key="idx">
        <el-submenu :index="item.path" v-if="item.children">
          <template slot="title">
            <svg-icon :icon-file-name="item.icon" style="margin: 0 10px 0 4px" />
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="(sitem,sidx) in item.children" :key="sidx" :index="sitem.path">{{ sitem.title }}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.path" v-else>
          <svg-icon :icon-file-name="item.icon" style="margin: 0 10px 0 4px" />
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      isCollapse: state => state.navCollapse.isCollapse,
      menuData: state => state.userMenuData.menuData
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
  transition: all .3s; // 动画
  &.isColl {
    width: 64px;
  }

  .el-menu {
    border: none;
  }

  .main-logo {
    padding: 10px 16px;
    color: white;
    position: relative;

    span {
      position: absolute;
      min-width: 160px;
      font-weight: bold;
      display: inline-block;
      top: 14px;
      left: 50px;
    }
  }
}
/* 解决加div后样式问题 */
.isColl .el-submenu__title span, ::v-deep .el-submenu--collapse .el-submenu__title .el-submenu__icon-arrow{
  display: none;
}
/* 菜单栏展开背景和选中背景 */
.el-submenu .el-menu-item {
  background-color: rgb(38, 52, 69) !important;
}
.el-menu-item:hover, ::v-deep .el-submenu .el-submenu__title:hover {
  background-color: #444 !important;
}
</style>
