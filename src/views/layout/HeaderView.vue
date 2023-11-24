<template>
  <div class="header">
    <div class="header-top">
      <!-- 折叠按钮 -->
      <div class="fl">
        <el-button v-show="isShow" icon="el-icon-s-fold" @click="showMenu"></el-button>
        <el-button v-show="!isShow" icon="el-icon-s-unfold" @click="showMenu"></el-button>
      </div>
      <!-- 面包屑 -->
      <div class="fl">
        <Breadcrumb></Breadcrumb>
      </div>
      <!-- 头像下拉菜单 -->
      <div class="fr">
        <el-dropdown @command="menuClick">
          <div class="avatar-box">
            <img :src="baseURL + (userInfo.user.avatar || '/profile/avatar/2022/10/10/blob_20221010200353A001.jpeg')" alt="" width="40">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="header-bottom">
      <!-- 标签栏 -->
      <Tag />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Tag from '@/components/Tag'
import { baseURL } from '@/utils/baseURL'

export default {
  components: { Breadcrumb, Tag },
  data () {
    return {
      isShow: true,
      baseURL
    }
  },
  computed: {
    ...mapState({ userInfo: state => state.userInfo.userInfo })
  },
  methods: {
    showMenu () {
      this.isShow = !this.isShow
      this.changeCollapse()
    },
    ...mapMutations({ changeCollapse: 'navCollapse/changeCollapse' }),
    menuClick (command) {
      if (command === 'logout') {
        localStorage.removeItem('authorization-token')
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
      }
    }
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
    .header-top {
      height: 50px;
      box-shadow: 0 3px 3px #eee;
    }
    .avatar-box {
      padding: 5px 20px 0 0;

      img {
        border-radius: 5px;
      }
      img, i {
        cursor: pointer;
      }
    }
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
</style>
