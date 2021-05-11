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
