import './module.styl'

const loading$ = {
  install: function (Vue, options) {

    Vue.prototype.$loading = function (options) {}

    Vue.prototype.$loading.params = { // 全局loading配置
      show: false, // 是否显示
      timer: 70, // 倒计时时间
      showTime: false, // 显示时间
      fn: () => {} // 回调函数
    }

    // 设置参数
    Vue.prototype.$loading.setParams = function (params) {

      if (params.show !== undefined) {
        Vue.prototype.$loading.params.show = params.show
      }

      if (params.timer !== undefined) {
        Vue.prototype.$loading.params.timer = params.timer
      }

      if (params.showTime !== undefined) {
        Vue.prototype.$loading.params.showTime = params.showTime
      }

      if (params.fn !== undefined) {
        Vue.prototype.$loading.params.fn = params.fn
      }

    }

    const defaultTimer = (() => { // 默认倒计时时间
      return Vue.prototype.$loading.params.timer
    })()

    let data = Vue.prototype.$loading.params

    data.defaultTimer = defaultTimer

    // 全局组件
    Vue.component('dk-loading', {
      template: `<transition name="dk-fade">
                  <div class="dk-loading" v-show="show">
                    <p>
                      <em v-show="showTime">{{ timer }}</em>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </p>
                  </div>
                </transition>`,
      data () {
        return data
      },

      watch: {

        show () { // 监听loading显示

          if (!this.show) { // 如果loading停止

            this.fn()

            this.$loading.setParams({ // 重置loading配置
              show: false,
              timer: defaultTimer,
              showTime: false
            })

          }

        },

        showTime () { // 监听倒计时是否完毕

          if (this.showTime) { // 如果开始倒计时

            const _this = this

            _timer()

            function _timer() {

              if (_this.timer > 0) { // 继续倒计时

                setTimeout(() => {

                  _this.$loading.setParams({
                    timer: _this.timer - 1
                  })

                  _this.showTime && _timer()

                }, 1000)

              } else { // 倒计时结束

                _this.$loading.setParams({
                  show: false
                })

              }

            }

          }

        }

      }

    })

  }
}

export { loading$ as default }
