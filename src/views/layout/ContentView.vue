<template>
  <div class="layout-content">
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-content {
  padding: 20px;
  height: calc(100% - 124px);
  background: url("@/assets/images/bg.jpg");
  background-size: 100% auto;
}
</style>
