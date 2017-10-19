import './module.css'

const alert$ = {
  install: function (Vue, options) {

    Vue.prototype.$alert = function (options) {}

    Vue.prototype.$alert.params = { // 全局alert配置
      msg: '', // 弹出提示文字
      info: '', // 详情文字
      btn: '确定', // 按钮文字
      auto: 2000, // 自动关闭时间, 0为不自动关闭, 此时出现按钮
      show: false, // 是否显示
      fn: () => {} // 隐藏之后的回调函数
    }

    // 设置参数
    Vue.prototype.$alert.setParams = function (params) {

      if (params.msg !== undefined) {
        Vue.prototype.$alert.params.msg = params.msg
      }

      if (params.info !== undefined) {
        Vue.prototype.$alert.params.info = params.info
      }

      if (params.btn !== undefined) {
        Vue.prototype.$alert.params.btn = params.btn
      }

      if (params.auto !== undefined) {
        Vue.prototype.$alert.params.auto = params.auto
      }

      if (params.show !== undefined) {
        Vue.prototype.$alert.params.show = params.show
      }

      if (params.fn !== undefined) {
        Vue.prototype.$alert.params.fn = params.fn
      }

    }

    let data = Vue.prototype.$alert.params

    // 全局组件
    Vue.component('dk-alert', {
      template: `<transition v-on:after-enter="autoHide" v-on:after-leave="reset" name="dk-slide">
                  <div class="dk_alert_content" v-show="show">
                    <div class="dk_alert_msg" v-bind:class="{dk_alert_hide : !!!msg}">
                      {{ msg }}
                    </div>
                    <div class="dk_alert_info" v-bind:class="{dk_alert_hide : !!!info}">
                      {{ info }}
                    </div>
                    <div class="dk_alert_btn" v-bind:class="{dk_alert_hide : !!auto}">
                      <span v-on:click.prevent="hide">
                        {{ btn }}
                      </span>
                    </div>
                  </div>
                </transition>`,
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
        reset () {

          this.fn()

          this.$alert.setParams({
            msg: '',
            info: '',
            btn: '确定',
            auto: 2000,
            fn: () => {}
          })

        }
      }

    })

  }
}

export { alert$ as default }
