// import $ from 'jquery' // 引入jQuery, 如果全局已经引入则不需要

const ajax$ = {
  install: function (Vue, options) {

    Vue.prototype.$ajax = function (options) {

      /* 参数
      {
        action: '', // 请求方法
        params: {}, // 请求参数
        loading: [true, true], // loading配置[loadingStart, loadingStop], true为启用, false为停用
        fn: () => {} // 回调函数
      }
      */

      // 默认值
      options.loading = options.loading === undefined ? [true, true] : options.loading
      options.fn = options.fn === undefined ? () => {} : options.fn
      options.baseUrl = (options.baseUrl === undefined ? $config.server : options.baseUrl);

      let url = options.baseUrl + options.action + '?token='+options.token;
      // console.log(url);
      // ajax
      $.ajax({
        type: 'POST',
        url: options.baseUrl + options.action + '?token='+options.token,
        data: JSON.stringify(options.params),
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

          switch (data.returnCode) {

            case '200': //成功

              options.fn(data, options.magicData)
              break;

            default: // 其他

              Vue.prototype.$alert.setParams({
                show: true,
                msg: data.returnCode,
                info: data.message
              })

          }
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
          if(! (options.endfn === undefined) ){
            options.endfn(options.magicData);
          }
        }
      })

    }

  }
}

export { ajax$ as default }
