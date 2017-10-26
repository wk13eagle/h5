## API文档
------

#### <font color=SteelBlue>getInfo</font>

###### 请求 ( POST )
| 参数 | 必选 | 类型 | 描述 |
| :-- | :-- | :-- | :-- |
| mobile | <font color=Crimson>是</font> | String | 手机号码 |
| sms | <font color=Crimson>是</font> | String | 短信验证码 |
| name | <font color=DarkCyan>否</font> | String | 昵称 |

``` html
<!-- 示例 -->
url?mobile=13812345678&sms=123456&name=铁锤
```

###### 返回 ( JSON )
| 参数 | 类型 | 描述 | 备注 |
| :-- | :-- | :-- |:-- |
| returnCode | String | 状态码 | 200为成功 |
| returnMsg | String | 状态描述 |

``` js
// 示例
{
  returnCode: "200",
  returnMsg: "请求成功"
}
```
