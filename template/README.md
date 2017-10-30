## {{name}}

> {{description}}

#### 构建

``` bash
# 安装依赖
npm install

# 启动服务 localhost:8080
npm run dev

# 打包输出
npm run build
```

#### 说明
支持 `pug( jade )`、`stylus`，默认按iPhone7分辨率( <font color=SteelBlue>宽度750px，dpr2，html基值10px</font> )计算rem值，等比适配。如需调整，需在 <font color=SteelBlue>main.js</font> 和 <font color=SteelBlue>base.styl</font> 中调整。默认已经全局引入 `jQuery`。

#### 项目结构
``` bash
+ project # 项目结构
  |- + src # 源码
  |    |- + assets # 资源
  |    |- + components # 组件
  |    |    |- + dk-ajax # ajax工具
  |    |    |- + dk-alert # 弹出框工具
  |    |    |- + dk-loading # loading工具
  |    |    |- + dk-url # 获取url键值参数工具
  |    |    |-   base.styl # rem转换
  |    |- + pages # 页面
  |    |    |- + info # demo
  |    |    |    |- index.vue # 页面
  |    |    |    |- state.js # 状态
  |    |    |- + list #demo
  |    |    |    |- index.vue #页面
  |    |    |    |- state.js #状态
  |    |-   pagelist.js # 页面配置文件
  |- + node_modules # node依赖
  |-   package.json # npm配置文件
  |-   index.html # 页面入口
  |-   config.js # 项目配置文件
  |-   webpack.config.js # webpack配置文件
  |-   API.md # API接口文档
  |-   README.md # 说明文档
```

#### 工具

###### base.styl

`使用方法 $(10px)`

``` stylus
/* 示例 */
@import "base.styl" /* 路径使用文件所在位置 */
/* 如果需要使用不同的dpr及基值, 可以在引入后设置相应参数(不建议)
   scale = 1

   推荐:
   1. 使用默认配置
   2. 全局参数统一,在main.js和base.styl里面统一设置, 另对dk-alert和dk-loading进行单独设置进行兼容处理(如果需要这两个的话)
*/
div
  width $(10px) /* 以默认设置为例, 会被编译成 div {width: 1rem;} */
```

###### dk-ajax

loading使用 `dk-loading`, 弹出使用 `dk-alert`。

使用 `jQuery` ajax，需要根据项目进行调整。

`在vue实例中使用this.$ajax()调用`

``` js
// 示例
this.$ajax({
  url: '', // 请求地址
  params: '', // 请求参数
  loading: '', // loading配置[loadingStart, loadingStop], true为启用, false为停用
  success: () => {} // 成功回调函数, 失败在dk-ajax中统一处理
})
```

###### dk-alert

`在vue实例中使用this.$alert.setParams()调用`

``` js
this.$alert.setParams({
  msg: '', // 弹出提示, 可传入字符串或数组; 传入字符串默认居中显示, 传入数组例如['内容', '对齐方式(left/center/right)']
  info: '', // 详情, 可传入字符串或数组; 传入字符串默认左对齐(左对齐两端对齐, 居中和右对齐不能两端对齐), 传入数组例如['内容', '对齐方式(left/center/right)']
  btn: '', // 按钮, 可传入字符串,数组或object类型, 传入字符串为按钮文字, 默认为'确定', 右对齐, 传入数组例如['按钮文字', '对齐方式(left/center/right)'], 传入字符串或数组参数按钮只能用来关闭弹出; 传入object为多按钮, [object,object...], 例如[{title: '取消', fn: (close) => {close()}},{title: '确定', fn: () => {}}]
  auto: 2500, // 自动关闭时间, 单位毫秒, 默认2500毫秒。0为不自动关闭, 此时出现按钮
  show: false, // 是否显示
  theme: 1 // 样式, 1-7彩虹色
})
```

###### dk-loading

`在vue实例中使用this.$loading.setParams()调用`

``` js
// 示例
this.$loading.setParams({
  show: true, // 必须, 是否显示
  timer: 70, // 可选, 倒计时时间
  showTime: false, // 可选, 显示时间
  fn: () => {} // 可选, 回调函数
})
```

###### dk-url

`在vue实例中使用this.$url()调用`

``` js
this.$url('key') // 参数为字符串, 返回结果为字符串
this.$url(['key1', 'key2']) // 参数为数组, 返回obj, {key1: value1, key2: value2}
```
