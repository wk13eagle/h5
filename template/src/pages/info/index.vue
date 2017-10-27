<template lang="pug">
  div
    p info
</template>

<script>

export default {
  data () {
    return {

    }
  },
  methods: {

  },
  beforeRouteEnter (to, from, next) {
    alert('欢迎进入info页面！')
    next()
  }
}
</script>


<style lang="stylus" scoped>

@import "../../components/base.styl";

div
  background #f5f5f5
  box-sizing border-box
  padding $(10px)

</style>
