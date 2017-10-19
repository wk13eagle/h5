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
  mounted () {

  },
  computed: {

    userInfo:{
      get(){
        return this.$store.state.recharge.userInfo
      },
      set(value){
        this.$store.commit('recharge/setUserInfo', value)
      }
    }
  },
  methods: {


  }
}
</script>
