# 目录
* [概述](#概述)
    * 为何要写测试
    * 前端测试的类型
    * TDD vs BDD
* [常用前端单元测试框架](#常用前端单元测试框架)
    * Jest
    * Mocha
* [More](#More)
    * 前端测试该写些什么
    * 写什么都比没有开始好
* [参考链接](#参考链接)

# 概述
## 为何要写测试？  
从自己的经验来说，在开发阶段，写测试能帮助自己对功能的实现，有一个较为全面的思考，并且降低后续修改引入 Bug 的几率。在交付之前，就能排除大量的 Bug。在后续测试，或需求变更的情况下，修改代码之后，可以保证不对已经稳定的功能引入新 Bug。从别人处接手项目时，也能大大避免因新接手人员对项目不熟悉，引入的新问题。
总体上来说，为自己的代码写测试，是一项首次繁琐、后续便利的工作，并且从长远来看，一个项目后续修改的频率要远远大于首次的构建和开发，不论对测试、开发、交接都是利大于弊的╮(╯_╰)╭。
这篇以本人入手时的体验，简单介绍前端测试的部分内容。

## 前端测试的类型
有一种关于测试的分类，称为**前端测试金字塔**，将前端测试从塔底到塔尖分为：
* 单元测试（Unit Tests）
  顾名思义，对一个功能单元进行测试，如一个对日期进行格式化的方法。  
  单元测试是非常细化和相对全面的，要保证一个单元代码的可靠性，需要尽可能地对所有情况编写测试脚本。
* 快照测试（Snapshot Tests）
  快照测试是对 UI 组件渲染结果的测试。  
  在 Jest 中，快照测试并不是对图片进行比对，而是保存渲染组件的标记，使得快照文件体积小，而测试速度快。
  更多关于 [Jest snapshot test](#https://jestjs.io/docs/en/snapshot-testing#what-is-the-performance-of-snapshot-testing-regarding-speed-and-size-of-the-generated-files)
* 端到端测试（End to End Tests）
  是对模拟我们对项目的实际操作，测试过程较为复杂和繁琐，耗时长。

想了解更多关于这几种测试类型的细节，请看 [前端测试金字塔](#https://medium.freecodecamp.org/the-front-end-test-pyramid-rethink-your-testing-3b343c2bca51)
    
## TDD vs BDD
测试驱动开发（TDD）是先写测试，根据测试的内容实现具体的功能代码，再用之前的测试进行验证。TDD 是用测试来推动功能的实现。  
行为驱动开发（BDD）是从行为的角度来定义测试的内容，用自然语言描述测试用例。  
有关于 TDD 和 BDD 的思考，可以参考 [The Difference Between TDD and BDD](#https://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)

# 常用前端单元测试框架
常见的测试框架有 [Jest](#https://jestjs.io/en/)，[Mocha](#https://mochajs.org)，[Jasmine](#https://jasmine.github.io/) 等。
这里举例说明一下 Jest 和 Mocha。
## Jest
* 配置简单（开箱即用）
* 自带断言库（在 Jest 中称为 [matchers](#https://jestjs.io/docs/en/expect)）
* 内置的覆盖率（coverage）统计
* 内置的快照功能 
  Jest 由 Facebook 团队开发维护，故对于测试 React、ReactNative 项目支持友好。
### 使用
（来自官网的例子）
新建一个项目（npm init），新建一个 /src 目录和 /test 目录，用于存放功能代码和测试代码。  
安装 Jest，无需额外配置：  
```
npm install --save-dev jest
// or
yarn add --dev jest
```
完成后的目录如下：
```
/project
    -/node_modules
    -/src
    -/test
```
在 /src 文件目录下新建一个 sum.js 文件，
```javascript
function sum(a, b) {
    return a + b;
}
module.exports = sum;
```
在 /test 中新建一个 sum.test.js 文件，引入 sum.js 的方法：
```
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
在 package.json 的 scripts 中新增：
```
"scripts": {
  "test": "jest"
}
```
之后运行：
```
npm run test
// or
yarn test
```
就可以得到结果：
```
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```
上面例子中的“expect(sum(1, 2))”称为断言，在 Jest 中叫做“matchers”，Jest 提供了多种 [API](#https://jestjs.io/docs/en/expect) 满足不同的情况。
Jest 为每个测试文件预置了一些全局方法和对象，“test” 用来包裹一个最小的测试单元，一系列相关的测试单元可以用 “describe”包裹：
```
const myBeverage = {
  delicious: true,
  sour: false,
};

describe('my beverage', () => {
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});
```

## Mocha
* 配置自由灵活
* 自行引入需要的断言库
* 支持几种不同的测试代码的组织形式（包括 BDD、TDD 等）
* 可运行在 Node 环境和浏览器  
  Mocha 的有更高的自由度，更能配合需要高度定制化的项目，插件配置方面也能找到大量的参考信息。 
### 使用
安装方式类似。
Mocha 需要自行引入断言库（即需要自行额外安装对应的库），在使用上，和 Jest 并没有太大区别：
```
var assert = require('assert')
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1)
    })
  })
})
```
可以直接运行：
```
./node_modules/mocha/bin/mocha
```
或者也在 package.json 中新增 scripts：
```
"scripts": {
    "test": "mocha"
}
...
npm test
```
Mocha 中 describe 是作为 BDD 的一种接口，它同时提供适用 TDD 的接口：suite(), test(), suiteSetup(), suiteTeardown(), setup(), and teardown()等：
```
suite('Array', function() {
  setup(function() {
    // ...
  });

  suite('#indexOf()', function() {
    test('should return -1 when not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
```
除了 BDD、TDD，Mocha 还支持 Exports，QUnit，和 Require-style 接口，具体参考[文档](#https://mochajs.org)

# More
## 前端测试该写些什么
刚开始接触入门前端测试时，最困扰我的就是测试到底该写什么了。  
对 UI 进行测试的目的较为明确，只要根据页面需要达到的效果，对照着加入测试即可。但若进行单元测试，或者针对功能进行测试时，我们总是希望覆盖面能广一点、考虑的情况能全面一点，以达到更好的测试效果。不同的项目代码的功能、组织方式大相径庭，很难有一套通用的定论来指明我们的测试代码具体应该怎么写。  

个人来说我会从这几个角度入手：
    
### 代码层面
  * 对临界值、数据格式、数据不存在等特殊情况进行测试。
  * 根据某个函数需要完成的功能，排列组合出可能的情况进行测试。
    
### 需求层面

* 根据产品给出的明确需求，排列组合出可能涉及的各种情况，进行用例测试。这一部分类似测试人员的功能测试。
* 测试过程中出现 Bug 的情况
  即使在开发过程中通过测试规避了很多问题，但不可避免仍会有一些特定场景会引出 Bug，功能修复后添加针对该场景的测试脚本，可以规避该场景 Bug 的重复出现。

## 写什么都比没有开始好
对于不同的项目，需要侧重的测试方面也大不相同，真正开始思考如何全面地测试一个项目，并且转换成测试代码之后，能大大提升代码质量，提升代码的复用性、模块化划分、全面性。  
从长远上来看也能显著提升大型项目的开发效率，特别是参与开发人员多、交接频繁、迭代频率高的项目。

Thanks.

# 其他参考
* [Jest](#https://jestjs.io)
* [Mocha](#https://mochajs.org)
* [](https://hackernoon.com/testing-your-frontend-code-part-i-introduction-7e307eac4446)

