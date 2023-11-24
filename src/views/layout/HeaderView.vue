<template>
  <div class="header">
    <div class="header-top">
      <div class="fl">
        <el-button v-show="isShow" icon="el-icon-s-fold" @click="showMenu"></el-button>
        <el-button v-show="!isShow" icon="el-icon-s-unfold" @click="showMenu"></el-button>
      </div>
      <div class="fl">
        <Breadcrumb></Breadcrumb>
      </div>
      <div class="fr avatar-box">
        <img :src="baseURL + (userInfo.user.avatar || '/profile/avatar/2022/10/10/blob_20221010200353A001.jpeg')" alt="" width="40">
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import { baseURL } from '@/utils/baseURL'

export default {
  components: { Breadcrumb },
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
    ...mapMutations({ changeCollapse: 'navCollapse/changeCollapse' })
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
