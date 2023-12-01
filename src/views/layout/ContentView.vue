<template>
  <div class="layout-content">
    <router-view :class="{hasbg: $route.path == '/home'}" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.hasbg {
  background: url("@/assets/images/bg.jpg");
  background-size: 100% auto;
}
.layout-content {
  padding: 20px;
  height: calc(100% - 124px);
}
</style>
