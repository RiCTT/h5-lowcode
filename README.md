# LowCode H5 Plan

## 功能

## 记录

- 适配 h5 端，如何保证书写的元素宽高保持多设备兼容

  采取 px->rem，调研了 postcss、postcss-plugin-px2rem 库，没有只转换 include 的目标文件夹，后期可以实现一个；于是想到了 vscode + 插件，要求 vscode 编辑器 + cssrem 插件，默认统一 rootvalue 为 16px，即 1rem=16px，书写 css 的时候使用 tab 键转换；

- 预览区、编辑区，要不要耦合在一起？还是拆开

  耦合在一起会很方便开发，组件中的数据拆分一份js共享就可以了；拆开的话，首先会最大程度还原UI效果，减少样式污染等；但是带来的问题是要在iframe之间进行通信，编写重复代码；综合后期维护等考虑，还是选择了拆开；
  
  更新：预览 + 编辑 + 属性，应该是有这三个模块，预览单独iframe，不做编辑，只做预览沙箱；其次，iframe交互太复杂，成本高

- 容器组件 + 尺寸自适应组件

  参考过其他库，一个正方形的界面，上下左右调整边距，一开始想到margin，margin不会影响背景色等

- 表单渲染（FormRender）

  - 统一所有模板组件schema（如果只是表单组件用schema，其他UI组件混合在一起，逻辑会复杂）

    ```js
      
    /** 
     * 约束：
     *  最外层schema的type统一为type
     *  当type为array时，items作为一个object，描述数组项的类型，string or object，或者校验，或者props等属性
     *  根据type初始化表单数据，解决表单样式显示 + 嵌套对象值的问题
     */

    /**
     * 越想越把自己给绕进去了，
     * package.json本质上只是对组件的描述，如果想单纯依赖这个描述文件还原UI是不可能，是需要自己开发的

    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "title": "姓名",
          "type": "string"
        },
        "string": {
          "title": "string类",
          "type": "object",
          "properties": {
            "stringDate": {
              "name": "日期",
              "type": "string"
            }
          }
        },
        "array": {
          "title": "array类",
          "type": "array",
          "items": {
            "type": "string",
            "type": "object",
            "properties": { ... }
          }
        }
      }
      "formData": {
        "name": "",
        "string": {
          "stringDate": ""
        },
        "array": [""],
      }
    },
    ```

- 代码结构新篇

  一直分不清模板表单跟属性编辑区的表单是什么一种关系，分开，还是共用。分开意味着更高的开发成本，需要同时维护两套差不多的代码；共用意味着代码复杂度上升，逻辑会耦合在一起，后期维护也不方便牵一发而动全身。

  参考了h5dooring的项目，发现之前的思考被限制住了，为什么一定要用package.json去做模板描述呢，每个组件内部的函数，变量都是组件特有的，即每个组件只需要维护自己的数据 + 外部提供的回调（校验函数）来通知外部变化

  ```js
  // index.vue 组件内部

  const defaultProps = {
    ...baseProps,
    {
      key: 'color',
      name: '颜色',
      type: 'color'
    }
  }

  ```

- 【调试技巧】

  用了elForm表单的校验一直走不到validate回调，这时候需要调试，但是直接在源码里面打debugger是进不到的，需要改变引入包的方式

  ```js
  // 这种引入方式会将引入的包整体打包作为一个压缩后的包使用
  import { ElForm } from 'element-plus'

  // 引用到实际源码地址，修改源码需要重新启动项目，可以打log，debugger（控制台sources栏也可以）
  import ElForm from 'element-plus/packages/.../...vue' 
  ```


## 关于代码

- 不用vuex，怎么实现小型store（公共数据仓库），在模板上，组件实例生命周期函数中自动更新

  - 使用reactive包装，整个state导出
    ```js
    // 导出一
    export const state = reactive({
      count: 1
    })
    // 引入的文件，以下哪份setup更新count，state中的count会同步更新
    setup() {
      // 解构那会数据已经解绑了，所以reactive失效
      // const { count } = reactive(state) 
      const { count } = toRefs(state)
      const onClick = () => {
        count.value++
      }
    }

    setup() {
      const { count } = state
      const onClick = () => {
        count++
      }
    }

    setup() {
      const count = state.count
      const onClick = () => {
        count++
      }
    }
    ```
    ```js
    // 导出二
    export const state = toRefs(reactive({
      count: 1
    }))
    // 引入
    setup() {
      const { count } = state
      const onClick = () => {
        count.value++
      }
    }

    setup() {
      const count = state.count
      const onClick = () => {
        count++
      }
    }
    ```

  - 统一这样
  ```js
  export const state = toRefs(reactive({
    count: 1
  }))

  // 导入
  import { state } from '../index.js'
  const { count } = state

  setup() {
    const onClick = () => {
      count.value ++
    }

    watch(count.value, () => {
      console.log('count change')
    })
  }
  ```


- 给proxy对象中的key赋值一个新的对象，会导致自动更新失败

```js
  const { selectItem } = toRefs(reactive({
    selectItem: {
      data: {
        a: 123,
        b: 456
      }
    }
  }))

  // 失效，
  selectItem.data = { c: 789 }

  // 生效
  selectItem.data = Object.assign(selectItem.data, { c: 789 })
  selectItem.data = { ...otherObj } 

```

- 关注源码实现的部分

  - 公共state，reactive包裹导出，在引入的地方toRefs，引用的地方是怎么保持更新追踪的

    ```js
    export const state = reactive({
      count: 1
    })

    import { state } from '../xx.js'
    const { count } = toRefs(state)
    ```
  
  - 同上，如果多个文件toRefs，state是包裹了很多层吗

    ```js
    // a.js
    const { count } = toRefs(state)
    // b.js
    const { count } = toRefs(state)

    // state还是它原来的样子吗
    ```