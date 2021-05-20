// 公共数据
import { reactive, toRefs } from 'vue'

const templateList = []
const modules = import.meta.globEager("../../../template/*/index.vue");
Object.keys(modules).forEach((key) => {
  const data = modules[key].default;
  const { name, tplData, tplProps } = data
  templateList.push({ name, tplData: { ...tplData }, tplProps })
});

const componentModel = { 
  name: '',
  tplData: {},
  tplProps: {}
}

export const state = toRefs(reactive({
  templateList,
  editComponentList: [], // 编辑区域当前所有组件
  currentSelectComponent: { ...componentModel } // 当前选中的组件
}))