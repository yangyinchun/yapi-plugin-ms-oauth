# yapi-plugin-ms-oauth

第三方插件，Microsoft基于Oauth2协议登录，在生成的配置文件中，添加如下配置即可：

```
"plugins": [
    {
      "name": "ms-oauth",
      "options": {
        "type": "oauth2",
        "hostscheme": "https",
        "hostname" : "login.microsoftonline.com",
        "authPath" : "/xxxxxxxxxxxxxxxxxx/oauth2/v2.0/authorize",
        "tokenPath" : "/xxxxxxxxxxxxxxxxxx/oauth2/v2.0/token",
        "redirectUri" : "http://localhost:3000/api/plugin/oauth2/callback",
        "appId" : "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "appSecret" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      }
    }
  ]
```
使用注意:

这里面的配置项含义如下：  

- `hostscheme` oauth2服务器的访问协议
- `hostname` oauth2服务器的访问地址
- `loginPath` 获取用户信息路径
- `authPath` 授权路径
- `tokenPath` 获取access_token路径
- `redirectUri` 重定向路径