<template>
  <div class="home">
    <div class="content">
      <div class="box1" style="background-color: rgb(245,23,156);"></div>
      <div class="box2" style="background-color: rgb(12,233,3);"></div>
      <div class="box3" style="background-color: rgb(109, 5, 255);"></div>
      <div class="box4" style="background-color: rgb(35, 18, 145);"></div>
      <div class="box5" style="background-color: rgb(233, 3, 34);"></div>
      <div class="box6" style="background-color: rgb(233, 156, 3);"></div>
      <div class="box7" style="background-color: rgb(3, 179, 233);"></div>
      <div class="box8" style="background-color: rgb(233, 187, 3);"></div>
      <div class="box9" style="background-color: rgb(245,23,156);"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.content {
  width: 100%;
  height: 100%;
  background-color: skyblue;
  /* 设置网格布局 */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}
.box6 {
  grid-column: span 2;
}
</style>
