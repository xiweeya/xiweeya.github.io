# HTML Referer
## 目录
* 什么是 Referer
* 获取请求的 Referer
    * JavaScript 获取
    * 服务端获取
* 修改 Referer
    * rel 属性
    * referrerpolicy 属性
    * meta 标签
    * 请求头 Referrer-Policy
    * 页面重定向
* 用途
* 参考资料

## 什么是 Referer
Referer，或 HTTP referer（[HTTP 来源地址](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Refererhttps://zh.wikipedia.org/wiki/HTTP參照位址)），是 HTTP 请求头的一个字段，用来表示请求页面的 url，即访客的地址信息。
写入标准时，该字段拼写是错误的（正确的为 Referrer），由于修改成本等于原因，现在仍沿用这种拼写。
当浏览器请求一个服务器地址时，会带上 Referer 这个字段，告诉服务器这个请求是从哪里发出的。
如（Chrome 浏览器截图）：
```
 // Request Headers
 Referer: http://host.com
```

![7b0326831ae8af56174d899488dc06e7.png](evernotecid://E15FA5AE-981A-43F0-B060-4FFDD8B8A94C/appyinxiangcom/5622477/ENResource/p302)

---

当用户直接在浏览器输入地址打开页面，或者请求一个静态资源，该属性值为空。

## 获取请求的 Referer
### JavaScript 获取
通过 ```document.referrer```（这里是正确拼写）可以查看跳转或打开到当前页面的 url。

### 服务端获取
Node.js
```
// in http server:
const http = require('http')

http.createServer((req, res) => {
  const referer = req.headers.referer
  // ...
}).listen(8888, '127.0.0.1')
```

## 修改 Referer
可以修改单个元素的 Referer 行为，或者通过 [Referrer Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy) 修改默认的 Referer 行为。
如下几种实现方式（这里统一为实现不发送 Referer 的设置）：

### rel 属性
修改单个元素的 Referer 行为：
对标签（如：<a> <area> <link>）添加 ```rel="noreferrer"``` 参数直接修改：
```HTML
<a href="https://xxx.com" rel="noreferrer">xxx</a>
```

### referrerpolicy 属性
设置元素的 referrerPolicy 属性（如标签：<a> <area> <img> <iframe> <link>）
```HTML
<a href="https://xxx.com" referrerpolicy="no-referrer">xxx</a>
```

### meta 标签
在 HTML 页面头部添加：
```HTML
<meta name="referrer" content="no-referrer" />
```

### 页面重定向
从 A.html 页面跳转到 B.html 页面时，先跳转到 A/redirect.html 页面，再跳转至 B.html 页面，重定向后外部网站就只能知晓流量来源为 A 站，不会泄露过多信息。

## 用途
* 统计访问数据
一些数据统计网站，如 CNZZ、百度统计等，可以利用该信息进行流量统计。

* 隐私保护
如某社交媒体平台不想通过 Referer 泄露信息：当用户在平台上发布信息时插入了一个外部链接，当用户点击这个链接时，平台并不希望泄露用原有的完整的 url，仅让对方知道是从这个平台贡献的流量。

* 图片防盗链
根据 Referer 获知图片引用地址，限制只有自己平台的页面可以正常显示图片，减少不必要的流量消耗，保护图片版权。

## 参考资料
* [https://en.wikipedia.org/wiki/HTTP_referer](https://en.wikipedia.org/wiki/HTTP_referer)
* [http://www.ruanyifeng.com/blog/2019/06/http-referer.html](http://www.ruanyifeng.com/blog/2019/06/http-referer.html)
* [https://w3c.github.io/webappsec-referrer-policy/#directive-referrer](https://w3c.github.io/webappsec-referrer-policy/#directive-referrer)
* [https://www.facebook.com/notes/facebook-engineering/protecting-privacy-with-referrers/392382738919](https://www.facebook.com/notes/facebook-engineering/protecting-privacy-with-referrers/392382738919)