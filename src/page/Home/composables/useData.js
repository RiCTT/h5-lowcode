// 公共数据hook
import { reactive, toRefs } from 'vue'

const prevComponents = [];
const modules = import.meta.globEager("../../../../packages/*/*.json");
Object.keys(modules).forEach((key) => {
  const describeJson = modules[key].default;
  prevComponents.push(describeJson);
});

const componentModel = { name: '', props: {}, attrs: {} }

function useData() {
  const data = reactive({
    components: prevComponents, // 全局可添加的预览组件
    editComponentList: [], // 编辑区域当前所有组件
    currentSelectComponent: { ...componentModel } // 当前选中的组件
  })

  const actions = {
    updateCurrentSelectComponent: (value) => {
      console.log('change')
      data.currentSelectComponent = value
      console.log(data.currentSelectComponent)
    }
  }

  const dataAsRefs = toRefs(data)
  
  return {
    ...dataAsRefs,
    ...actions
  }
}

export default useData()