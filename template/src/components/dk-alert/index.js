/* eslint-disable */
import './module.css'

/**
* 使用方法:
  1. import引入并使用Vue.use()加载
  2. 实例中使用 this.$alert.setParams({}) 进行设置
     ...
     methods: {
       fun: function () {
         this.$alert.setParams({
           // 参数设置
         })
       }
     }

*/
const alert$ = {
  install: function (Vue, options) {

    Vue.prototype.$alert = function (options) {}

    // 参数设置
    Vue.prototype.$alert.params = {

      msg: '', // 弹出提示, 可传入字符串或数组; 传入字符串默认居中显示, 传入数组例如['内容', '对齐方式(left/center/right)']
      info: '', // 详情, 可传入字符串或数组; 传入字符串默认左对齐(左对齐两端对齐, 居中和右对齐不能两端对齐), 传入数组例如['内容', '对齐方式(left/center/right)']
      btn: '', // 按钮, 可传入字符串,数组或object类型, 传入字符串为按钮文字, 默认为'确定', 右对齐, 传入数组例如['按钮文字', '对齐方式(left/center/right)'], 传入字符串或数组参数按钮只能用来关闭弹出; 传入object为多按钮, [object,object...], 例如[{title: '取消', fn: (close) => {close()}},{title: '确定', fn: () => {}}]
      auto: 2500, // 自动关闭时间, 单位毫秒, 默认2500毫秒。0为不自动关闭, 此时出现按钮
      show: false, // 是否显示
      theme: 1 // 样式, 1-7彩虹色

    }

    // 设置参数
    Vue.prototype.$alert.setParams = function (params) {

      if (params.msg !== undefined) {

        if (typeof params.msg === 'string') { // 如果传入参数为字符串类型
          Vue.prototype.$alert.params.msg = [params.msg, 'center'] // 转化成数组形式, 默认文字居中
        } else if (params.msg instanceof Array) { // 如果传入参数为数组类型
          Vue.prototype.$alert.params.msg[0] = !!params.msg[0] ? params.msg[0] : '无信息' // 无内容显示默认内容
          Vue.prototype.$alert.params.msg[1] = params.msg[1] || 'center' // 默认居中对齐
        }

      }

      if (params.info !== undefined) {

        if (typeof params.info === 'string') { // 如果传入参数为字符串类型
          Vue.prototype.$alert.params.info = [params.info, 'left'] // 转化成数组形式, 默认文字左对齐
        } else if (params.info instanceof Array) { // 如果传入参数为数组类型
          Vue.prototype.$alert.params.info[0] = !!params.info[0] ? params.info[0] : '无信息' // 无内容显示默认内容
          Vue.prototype.$alert.params.info[1] = params.info[1] || 'left' // 默认左对齐
        }

      }

      if (params.btn !== undefined) {

        if (typeof params.btn === 'string') { // 如果传入参数为字符串类型

          Vue.prototype.$alert.params.btn = { // 转化成object形式, 默认按钮居右边
            align: 'right',
            list: [{
              title: '确定',
              fn: (close) => { close() }
            }]
          }

        } else if (params.btn instanceof Array) { // 如果传入参数为数组类型

          Vue.prototype.$alert.params.btn = { // 转化成object形式, 默认按钮居右边
            align: (() => {
              return params.btn[1] || 'right'
            })(),
            list: [{
              title: (() => {
                return !!params.btn[0] ? params.btn[0] : '确定'
              })()
            }]
          }

        } else if (params.btn instanceof Object) {

          Vue.prototype.$alert.params.btn = {
            align: (() => {
              return params.btn.align || 'right'
            })(),
            list: (() => {
              return params.btn.list || {title: '确定', fn: () => {}}
            })()
          }

        }

      }

      if (params.auto !== undefined) {
        Vue.prototype.$alert.params.auto = params.auto
      }

      if (params.show !== undefined) {
        Vue.prototype.$alert.params.show = params.show
      }

      if (params.theme !== undefined) {
        Vue.prototype.$alert.params.theme = params.theme
      }

    }

    let data = Vue.prototype.$alert.params;

    // 全局组件
    Vue.component('dk-alert', {
      template: '<transition v-on:after-enter="autoHide" v-on:after-leave="reset" name="dk-slide">' +
                  '<div class="dk_alert_content" v-bind:class=themeKind() v-show="show">' +
                    '<div class="dk_alert_msg" v-bind:class="{dk_alert_hide : !!!msg[0], dk_alert_left : msg[1] === \'left\', dk_alert_right : msg[1] === \'right\', dk_alert_center : msg[1] === \'center\'}">' +
                      '{{{ {{ msg[0] }} }}}' +
                    '</div>' +
                    '<div class="dk_alert_info" v-bind:class="{dk_alert_hide : !!!info[0], dk_alert_left : info[1] === \'left\', dk_alert_right : info[1] === \'right\', dk_alert_center : info[1] === \'center\'}">' +
                      {{{ '{{ info[0] }}' }}} +
                    '</div>' +
                    '<div class="dk_alert_btn" v-bind:class="{dk_alert_hide : !!auto, dk_alert_left : btn.align === \'left\', dk_alert_right : btn.align === \'right\', dk_alert_center : btn.align === \'center\'}">' +
                      '<span v-for="(item, index) in btn.list" v-on:click.prevent="btnFn(index)">' +
                        {{{ '{{ item.title }}' }}} +
                      '</span>' +
                    '</div>' +
                  '</div>' +
                '</transition>',
      data () {
        return data
      },
      methods: {
        hide () { // 隐藏弹出
          this.$alert.setParams({
            show: false
          })
        },
        autoHide () { // 自动隐藏
          if (this.auto > 0) {
            setTimeout(() => {

              this.hide()

            }, this.auto);
          }
        },
        themeKind () { // 样式
          return 'theme' + this.theme
        },
        btnFn (index) { // 按钮函数
          this.btn.list[index].fn(this.hide)
        },
        reset () {

          this.$alert.setParams({
            msg: '',
            info: '',
            btn: '',
            auto: 2500,
            theme: 1
          })

        }
      }
    })

  }
}

export { alert$ as default }
