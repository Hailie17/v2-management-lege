<template>
  <!-- tags 右键后的菜单组件 -->
  <div class="tags-menu" :style="{top: clientY + 'px', left: clientX + 'px'}">
    <ul>
      <li v-for="(item, index) in tmenu" :key="index" v-show="isShow(index)">
        <i :class="item.icon"></i>
        {{ item.text }}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  props: ['clientX', 'clientY', 'itemIndex', 'tagsLength'],
  data () {
    return {
      tmenu: [
        {
          icon: 'el-icon-refresh-right',
          text: '刷新页面',
          id: 1
        },
        {
          icon: 'el-icon-close',
          text: '关闭当前',
          id: 2
        },
        {
          icon: 'el-icon-circle-close',
          text: '关闭其他',
          id: 3
        },
        {
          icon: 'el-icon-back',
          text: '关闭左侧',
          id: 4
        },
        {
          icon: 'el-icon-right',
          text: '关闭右侧',
          id: 5
        },
        {
          icon: 'el-icon-circle-close',
          text: '全部关闭',
          id: 6
        }
      ]
    }
  },
  methods: {
    isShow (i) {
      // 用户点击第一个 -- 首页
      if (this.tagsLength === 1) {
        return i == 0
      }
      if (this.itemIndex === 0) {
        return ![1, 3].includes(i)
      }
      if (this.itemIndex === 1 && this.itemIndex === this.tagsLength - 1) {
        return ![1, 3].includes(i)
      } else if (this.itemIndex === 1 && this.itemIndex !== this.tagsLength - 1){
        return i !== 3
      }
      if (this.itemIndex === this.tagsLength - 1) {
        return i !== 4
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.tags-menu {
  background-color: #fff;
  box-shadow: 2px 2px 4px #ccc;
  position: absolute;
  border-radius: 5px;
  ul {
    padding: 5px 0;
  }
  li {
    font-size: 14px;
    padding: 8px 15px;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }
}
</style>
