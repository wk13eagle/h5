<template>
  <div>
    info
  </div>
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

<style>

</style>
