<template>
  <div>

    <p type="button">这是本页store中的test值：\{{ test1 }}</p>
    <p type="button">这是info页store中的test值：\{{ test2 }}</p>
    <button type="button" @click="fn1">点击我触发本页store中的mutations</button>
    <button type="button" @click="fn2">点击我触发info页store中的mutations</button>
    <button type="button" @click="fn3">点击我触发所有页面mutations</button>
    <br>
    <br>
    <button type="button" @click="fn4">点击我改变本页store中的test值</button>
    <button type="button" @click="fn5">点击我改变info页store中的test值</button>

    <br>
    <br>
    <router-link to="/info">进入info页面</router-link>

  </div>
</template>

<script>

export default {

  data () {
    return {
      test1: this.$store.state.list.test,
      test2: this.$store.state.info.test
    }
  },
  methods:{
    fn1 () {
      this.$store.commit('list/sameFn')
    },
    fn2 () {
      this.$store.commit('info/sameFn')
    },
    fn3 () {
      for (var val in this.$store.state) {
        this.$store.commit(val + '/sameFn')
      }
    },
    fn4 () {
      const _this = this
      this.$store.commit('changeState', {
        page: 'list',
        state: 'test',
        value: _this.test1++
      })
    },
    fn5 () {
      const _this = this
      this.$store.commit('changeState', {
        page: 'info',
        state: 'test',
        value: _this.test2++
      })
    }
  }
}
</script>

<style scoped>
  button {
    display: inline-block;
    background: #f5f5f5;
    border: 0;
    outline: 0;
    margin: 0.2rem 1rem;
  }
</style>
