// 重置样式
import 'normalize-css'

// 加载页面样式
import './assets/page.css'

// 计算根字号
document.getElementsByTagName('html')[0].style.fontSize = document.body.clientWidth / 375 * 10 + 'px'

// 引入jQuery
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery

/* 依赖库 */
import Vue from 'vue' // 引入vue

import Router from 'vue-router' // 引入vue-router
import Vuex from 'vuex' // 引入Vuex
import Loading from './components/dk-loading' // 引入loading组件
import Alert from './components/dk-alert' // 引入alert组件
import AlertFull from './components/dk-alert-full'
import Ajax from './components/dk-ajax.js' // 引入ajax组件
import URLTools from './components/get_url_value.js' // 引入url参数组件

Vue.use(Router)
Vue.use(Vuex)
Vue.use(Loading)
Vue.use(Alert)
Vue.use(AlertFull)
Vue.use(Ajax)

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

  localStorage.setItem("credential","q0sWC0GmccYI3U5CuIuRRgLBHYrIjWl01Wcp1iQeYM2KQsE-MawX5IyB-UNhhaJg");
  next();
  return;//TODO  调试使用

  if (localStorage.getItem('credential')){
      next();
  }else{
    let token = URLTools("token");
    let url = $config.loginURL.replace("{token}",token);

    window.location.href=url;
  }
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
      console.log('变更前：' + state[local.page][local.state])
      state[local.page][local.state] = local.value
      console.log('变更后：' + state[local.page][local.state])
    }
  }
})

/* 实例 */
var vm = new Vue({
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