# Git commit message 约定
翻译整理自 [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/)

## 目录
* [目的](目的)
* [Message格式](Message格式)
    * [关于回退操作](关于回退操作)
* [Header](Header)
    * [Type](Type)
    * [Scope](Scope)
* [Body](Body)
* [Footer](Footer)
    * [不兼容变动](不兼容变动)
    * [关闭的issue](关闭的issue)
* [其他示例](其他示例)
* [参考资料](参考资料)

## 目的
关于制定 commit message 格式的目的：
* 通过脚本自动生成 `CHANGELOG.md`（changelog 组成部分：`new features`, `bug fixes`, `breaking changes`）
* 忽略无需变动（如代码格式变动，添加、删除空行或缩进，缺失分号，注释等）
* 提供更好的历史信息

## Message格式
一条 commit message 包含 Header，Body 和 Footer，分别被一行空行隔开。
其中 Header 必写，Body 和 Footer 可选
```bash
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### 关于回退操作
如果是回退操作，头部应该以 `revert:` 开头，后跟回退的那个 commit 的 Header 信息
而 Body 的部分，应该指出被回退的那个 commit 的 hash 值：
```bash
This reverts commit <hash>
```

## Header
### Type
Message Header 是简单描述这次 commit 的一行文字，包括三个字段：`type`、可选的 `scope` 和 `subject`
其中用于区分这次 commit 主要内容的 `type` 可选值为：

* feat：即 feature，新功能 [`changelog`]
* fix：修复 bug [`changelog`]
* docs：文档（documentation）
* style：格式化、缺失分号等（不影响功能的变动）
* refactor：重构（即不是新增功能，也不是修改bug的代码变动）
* test：添加测试
* chore：日常维护（maintain），构建过程或辅助工具的变动

### Scope
用于说明 commit 影响的范围，如：$location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc...
若是没有合适的 scope 可以用 `*` 表示

### Subject
是对 commit 改动的简单描述
* 用祈使句的现在时（如用 `change` 作为动词开头，而不是 `changed``changes`）
* 不要大写第一个字母
* 不在结尾加结束符号（如英语句号 `.`）

## Body
* 如同 <subject> 中一样，用祈使句和现在时态
* 内容应包含代码变动的原因、和之前功能的对比

```bash
More detailed explanatory text, if necessary.  Wrap it to 
about 72 characters or so. 

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

## Footer
### 不兼容变动
所有的不兼容变动（Breaking changes）必须在 Footer 中进行说明，具体格式为：`BREAKING CHANGE: 空一格或者两行` 开头，剩下内容为具体说明、变更理由和变更提示

```
BREAKING CHANGE: isolate scope bindings definition has changed.
    the inject option for the directive controller injection was removed.
    
    To migrate the code follow the example below:
    
    Before:
    
    scope: {
      myAttr: 'attribute',
      myBind: 'bind',
      myExpression: 'expression',
      myEval: 'evaluate',
      myAccessor: 'accessor'
    }
    
    After:
    
    scope: {
      myAttr: '@',
      myBind: '@',
      myExpression: '&',
      // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
      myAccessor: '=' // in directive's template change myAccessor() to myAccessor
    }
    
    The removed `inject` wasn't generaly useful for directives so there should be no code using it.

```

### 关闭的 issue
解决的 Bugs 也应该在 `Footer` 里指出，以 `Closes` 开头：
```
Closes #234
```
或者多个 issues：
```
Closes #123, #245, #992
```

## 其他示例
```
feat($browser): onUrlChange event (popstate/hashchange/polling)

Added new event to $browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```

```
fix($compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead
```

```
feat($compile): simplify isolate scope bindings

Changed the isolate scope binding options to:
  - @attr - attribute binding (including interpolation)
  - =model - by-directional model binding
  - &expr - expression execution binding

This change simplifies the terminology as well as
number of choices available to the developer. It
also supports local name aliasing from the parent.

BREAKING CHANGE: isolate scope bindings definition has changed and
the inject option for the directive controller injection was removed.

To migrate the code follow the example below:

Before:

scope: {
  myAttr: 'attribute',
  myBind: 'bind',
  myExpression: 'expression',
  myEval: 'evaluate',
  myAccessor: 'accessor'
}

After:

scope: {
  myAttr: '@',
  myBind: '@',
  myExpression: '&',
  // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
  myAccessor: '=' // in directive's template change myAccessor() to myAccessor
}

The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

## 参考资料
[AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)

[阮一峰 - Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
