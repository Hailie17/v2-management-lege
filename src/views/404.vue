<template>
  <div>
    <p>找不到页面，正在给您跳转到首页{{ dots }}</p>
  </div>
</template>

<script>
export default {
  name: '404',
  data () {
    return {
      dots: ''
    }
  },
  created () {
    const t = setInterval(() => {
      this.dots += '..'
      if (this.dots === '..........') {
        clearTimeout(t)
      }
    }, 500)
    setTimeout(() => {
      this.$router.push('/')
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>

</style>
