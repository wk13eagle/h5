const url$ = {
  install: function (Vue, options) {

    Vue.prototype.$url = function (options) {

      /* 参数
			单个: key字符串, 返回字符串
			多个: 字符串数组[key1, key2...], 返回obj类型 {key1: value1, key2: value2...}
      */

			let returnContent,
					search = window.location.search.substring(1)

			this.fn = key => { // 获取单个键值函数

				const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"),
							r = search.match(reg)

				if (r !== null) {
					return decodeURIComponent(r[2]);
				}

				return null;
			}

			if (typeof options === 'string') { // 获取单个

				returnContent = this.fn(options)

			} else if (options instanceof Array) { // 获取多个

				returnContent = {}

				options.forEach(val => {

					returnContent[val] = this.fn(val)
				})

			} else {
				console.log('$url()参数需为字符串或数组！')
			}

			return returnContent

    }

  }
}

export { url$ as default }
