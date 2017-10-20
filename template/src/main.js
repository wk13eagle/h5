/* 依赖库 */
import Vue from 'vue' // 引入vue

import Router from 'vue-router' // 引入vue-router
import Vuex from 'vuex' // 引入Vuex

Vue.use(Router)
Vue.use(Vuex)

/* 页面 */
import PageList from './pages/pagelist.js'
let pageList = PageList

// 设置首页, pageList中的键值
const HOME = 'list'

/* 路由 */
let routes = []

for (let val in pageList) {

  if (val === HOME) {

    routes.push({
      path: '/',
      component: resolve => {
        require.ensure([], (require) => {
          resolve(require(pageList[val].path + 'index.vue'))
        })
      }
    })

  }

  routes.push({
    path: '/' + val,
    component: resolve => {
      require.ensure([], (require) => {
        resolve(require(pageList[val].path + 'index.vue'))
      })
    }
  })

}

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  next();
})


/* 状态 */
let modules = {}

for (let val in pageList) {

  modules[val] = require(pageList[val].path + 'state.js').module

}

const store = new Vuex.Store({
  modules: modules,
  mutations: { // 共用
    changeState (state, local) {
      // console.log('变更前：' + state[local.page][local.state])
      state[local.page][local.state] = local.value
      // console.log('变更后：' + state[local.page][local.state])
    }
  }
})

/* 实例 */
const vm = new Vue({
  el: '#app',
  router,
  store,
  data () {
    return {
      transitionName: 'slide-left' // 页面切换动画class
    }
  },
  watch: {
    // 监视路由
    '$route' (to, from){

      const to_depth = to.path === '/' ? HOME : to.path.substring(1), // 目的页
            from_depth = from.path === '/' ? HOME : from.path.substring(1), // 来源页
            direction = pageList[to_depth].index - pageList[from_depth].index // 页面方向, 0同级, 负数为后退, 正数为前进


      if (direction < 0) { // 后退

        this.transitionName = 'slide-right' // 设置相应动画
        
      } else { // 前进

        this.transitionName = 'slide-left'// 设置相应动画

      }
    }
  }
})
