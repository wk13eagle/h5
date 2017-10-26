// 计算根字号
document.getElementsByTagName('html')[0].style.fontSize = document.body.clientWidth / 375 * 10 + 'px'

/* 依赖库 */
import Vue from 'vue' // 引入vue

import Router from 'vue-router' // 引入vue-router
import Vuex from 'vuex' // 引入Vuex

import Loading from './components/dk-loading'
import Alert from './components/dk-alert'
import Ajax from './components/dk-ajax'
import Url from './components/dk-url'


Vue.use(Router)
Vue.use(Vuex)

Vue.use(Loading)
Vue.use(Alert)
Vue.use(Ajax)
Vue.use(Url)

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
      component: r => require.ensure([], () => r(require(pageList[val].path + 'index.vue')))
    })

  }

  routes.push({
    path: '/' + val,
    component: r => require.ensure([], () => r(require(pageList[val].path + 'index.vue')))
  })

}

const router = new Router({
  routes
})

// 页面组件进入时
router.beforeEach((to, from, next) => {
  // 要做的事, 比如判断登录

  next();
})


/* 状态 */
let modules = {}

for (let val in pageList) {
  modules[val] = require(pageList[val].path + 'state.js').module
}

const store = new Vuex.Store({
  modules: modules,
  mutations: { // 全局共用
    changeState (state, local) { // 改变状态统一方法
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
      toDepth: '', // 目的页路由名称
      fromDepth: '', // 来源页路由名称
      transitionName: 'slide-left' // 页面切换动画class
    }
  },
  watch: {
    // 监视路由
    '$route' (to, from){

      const _toDepth = to.path === '/' ? HOME : to.path.substring(1), // 目的页
            _fromDepth = from.path === '/' ? HOME : from.path.substring(1), // 来源页
            _direction = pageList[_toDepth].index - pageList[_fromDepth].index // 页面方向, 0同级, 负数为后退, 正数为前进

      // 存储页面名称
      this.toDepth = _toDepth
      this.fromDepth = _fromDepth

      if (_direction < 0) { // 后退

        this.transitionName = 'slide-right' // 设置相应动画

      } else { // 前进

        this.transitionName = 'slide-left'// 设置相应动画

      }
    }
  },
  updated () { // 组件更新

    // 设置title
    document.title = pageList[this.toDepth].title

    // 保存当前页面scrollTop值
    pageList[this.fromDepth].index = this.$children[0].$el.scrollTop

    // 设置前往页面scrollTop值
    this.$children[0].$el.scrollTop = pageList[this.toDepth].index

  }
})
