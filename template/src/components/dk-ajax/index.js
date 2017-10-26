// import $ from 'jquery' // 引入jQuery, 如果全局已经引入则不需要

const ajax$ = {
  install: function (Vue, options) {

    Vue.prototype.$ajax = function (options) {

      /* 参数
      {

        url: '', // 请求地址
        params: '', // 请求参数
        loading: '', // loading配置[loadingStart, loadingStop], true为启用, false为停用
        success: () => {} // 回调函数

      }
      */

      // 默认值
      options.loading = options.loading === undefined ? [true, true] : options.loading
      options.success = options.success === undefined ? () => {} : options.success

      // ajax
      $.ajax({
        type: 'POST',
        url: options.url,
        data: options.params,
        cache: false,
        contentType:"application/json; charset=UTF-8",
    		dataType: 'json',
        beforeSend: function () { // 开始请求

          // loading开始
          if (options.loading[0]) {

            Vue.prototype.$loading.setParams({
              show: true
            })
          }

        },
        success: function (data) {

          options.success(data)

        },
        error: function () { // ajax错误

          Vue.prototype.$alert.setParams({
            show: true,
            msg: '请求错误，请稍后尝试！'
          })

        },
        complete: function () { // 请求结束

          // loading结束
          if (options.loading[1]) {

            Vue.prototype.$loading.setParams({
              show: false
            })
            
          }

        }
      })

    }

  }
}

export { ajax$ as default }
