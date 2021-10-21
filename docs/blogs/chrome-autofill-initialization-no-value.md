# 谷歌浏览器自动填充并判断表单填充情况
需求场景：
开启保存密码和自动填充功能的谷歌浏览器（`chrome://settings/` -> `自动填充` `密码` -> `自动登录`开启），在页面登录框（账号、密码输入框）渲染完成后，会自动填入上一次登录的账号和密码。
此时输入框展示状态为输入了正确的账号密码，登录按钮应该为可点击状态（输入框值不满足条件时为 `disabled` 状态）。

问题：
谷歌浏览器的自动填充，在页面初始化时，虽然屏幕上显示出了填充的账号密码，但并未真正将自动填充的内容设置到 `input` 输入框的值里（`value` 属性值为空）。
当且仅当用户有点击等页面操作时，自动填充的内容才会立即设置到 `value` 属性中。
登录按钮的可点击状态，从页面初始化，到用户操作之前，有一段时间登录按钮的可点击状态为 `disabled`。

所以要解决的问题在于，在页面初始化并且无需用户操作时，**判断输入框填充了已保存的账号密码**。

## :autofill 伪类获取自动填充输入框
CSS 伪类 [:autofill](https://developer.mozilla.org/en-US/docs/Web/CSS/:autofill) 表示一个 `input` 元素被浏览器自动填充。

```css
input:-webkit-autofill {
  background: transparent;
}
input:autofill {
  background: transparent;
}
```

在页面初始化之后，获取被自动填充的元素：
```html
<form>
  <input type="text" />
  <input type="password" />
</form>
```

```javascript
const inputs = document.querySelectorAll('input:-webkit-autofill');

console.log(inputs.length); // 2
console.log(inputs[0]); // <input type="text">...</input>
console.log(inputs[1]); // <input type="password">...</input>
```

实际操作中，以下两种情况：
- 页面初始化自动填充（用户无操作时）
- 点击输入框，出现密码管理选择列表，鼠标在选择列表上移动
皆可通过 `-webkit-autofill` 获取到对应 `input` 元素（即此时输入框满足 `:-webkit-autofill` 条件）。

下一步考虑如何**获取 `input` 元素的 value 值**。

输出自动填充输入框的元素查看：
```javascript
console.log(inputs[0].type, inputs[0].value); // 'text' ''
console.log(inputs[1].type, inputs[1].value); // 'password' ''
```
可以看出，此时输入框的值为空（从页面上的视觉效果也可看出，初始化的文字样式，与用户点击页面后输入框的文字样式有明显区别）。

## 自动填充设置 shadow-root 来展示值
进一步输出完整 `input` 元素：
```javascript
console.log(inputs[0]);
// <input type="text">
//   #shadow-root (user-agent)
//     <div pseudo="-webkit-input-placeholder" id="placeholder" style="display: block !important;">15000000001</div>
//     <div></div>
// </input>
```
可以看出自动填充初始状态，将值放在 `shadow-root` 里仅作展示，并且由于是 `user-agent` 的 shadow-root 我们无法通过 [shadowRoot](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/shadowRoot) 进一步获取数据。
也无法通过获取元素的 `value` 属性值，来判断登录按钮的可点击状态。

考虑到页面仅在初始化状态无法获取自动填充的值，只要用户点击后，表单数据的赋值操作立即生效。可以认为只要满足 [页面初始化, 用户点击] 这段时间内，“浏览器自动填充了账号密码”这个条件满足，将登录按钮置为可点击状态是合理的。
因此改用替代方案：**监测页面是否出现了自动填充现象**（并不需要获取到具体的 `value` 属性值）

## 最终方案：监测页面自动填充状态
```javascript
const inputs = document.querySelectorAll('input:-webkit-autofill') || [];
const types = Object.values(inputs).map(({ type }) => type);

if (inputs.length === 2 && types[0] === 'text' && types[1] === 'password') {
  // Chrome 自动填充后值未写入 value，但页面有用户操作后即可正常获取到 value
  // 因此检测到两个 autofill 的 input 框即视为已自动填充账号密码

  // 满足条件，登录按钮置为可点击
  // ...
}
```

由于从页面初始化到浏览器进行自动填充操作会有时间间隔，设置一个定时器在限定时间内进行循环判断操作。
进一步优化：
```javascript
const start = Date.now();
const t = setInterval(() => {
  const inputs = document.querySelectorAll('input:-webkit-autofill') || [];
  // 具体判断条件可根据具体情况调整
  const types = Object.values(inputs).map(({ type }) => type);

  if (inputs.length === 2 && types[0] === 'text' && types[1] === 'password') {
    clearInterval(intervalId);
    // ...
  } else if (Date.now() - start > 2000) {
    clearInterval(t);
  }
}, 100);
```

完成。

## 参考资料
* [Google Chrome 帮助 - 获取您在所有设备上保存的书签、密码等信息](https://support.google.com/chrome/answer/165139?visit_id=637033242431055702-1179168720&rd=1)
* [HTML 自动完成属性 - autocomplete](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/autocomplete)
* [HTML Standard (HTML) #selector-autofill](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-autofill)
* [使用 shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)
* [stackoverflow - Chrome Autofill/Autocomplete no value for password](https://stackoverflow.com/questions/35049555/chrome-autofill-autocomplete-no-value-for-password)
