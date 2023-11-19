<template>
  <div class="navbar" :class="{ isColl : isCollapse}">
    <h1 class="main-logo">
      <img src="../../assets/logo.png" alt="" width="24">
      <span v-show="!isCollapse">通用后台管理系统</span>
    </h1>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      :collapse="isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
      active-text-color="#ffd04b">
      <div v-for="(item, idx) in menuData" :key="idx">
        <el-submenu :index="idx" v-if="item.children">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="(sitem,sidx) in item.children" :key="sidx" :index="sidx">{{ sitem.title }}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="idx" v-else>
          <i class="el-icon-menu"></i>
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
    return {
      menuData: [
        {
          title: '首页',
          path: '/'
        },
        {
          title: '客户管理',
          path: '/customer',
          children: [
            {
              title: '客户档案',
              path: '/customer/customer'
            },
            {
              title: '拜访记录',
              path: '/customer/visit'
            }
          ]
        },
        {
          title: '修养预约',
          path: '/business',
          children: [
            {
              title: '预约信息',
              path: '/business/appointment'
            },
            {
              title: '服务项',
              path: '/business/service'
            },
            {
              title: '结算单',
              path: '/business/statement'
            }
          ]
        },
        {
          title: '流程管理',
          path: '/flow',
          children: [
            {
              title: '审核流程定义',
              path: '/flow/definition'
            }
          ]
        }
      ]
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
</style>
