// 公共数据
import { reactive, toRefs } from 'vue'

const templateList = []
const modules = import.meta.globEager('../../../template/*/index.vue')
Object.keys(modules).forEach((key) => {
  const data = modules[key].default
  const { name, tplData, tplProps } = data
  templateList.push({ name, tplData, tplProps })
})

export const state = toRefs(reactive({
  dragging: false,
  dragItem: {}, // 拖拽中的信息
  templateList,
  editComponentList: [], // 编辑区域当前所有组件
  currentSelectComponent: {
    uid: null,
    tplData: {},
    tplProps: {}
  } // 当前选中的组件
}))
