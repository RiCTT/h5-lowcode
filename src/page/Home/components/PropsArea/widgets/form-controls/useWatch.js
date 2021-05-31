import { watch, ref } from 'vue'
import { TEXT_TYPE_OPS, PICKER_TYPE_OPS, UI_OPS } from './enum.js'
import { UPDATE_MODEL_EVENT } from '@/utils/constants.js'

export default function useWatch({ modelValue, dialogVisible, model, form }, ctx) {
  const uiOptions = ref(UI_OPS)
  const typeOptions = ref(TEXT_TYPE_OPS)

  // 监听同步Dialog状态
  watch(modelValue, (val) => {
    dialogVisible.value = val
  })
  watch(dialogVisible, (val) => {
    ctx.emit(UPDATE_MODEL_EVENT, val)
  })

  watch(form, (val) => {
    model.value = { ...val }
  })

  // 根据选中的UI组件，动态渲染ui的可选择属性栏
  watch(() => model.value.ui, (val) => {
    console.log('ui', val)
    if (val === 'van-datetime-picker') {
      typeOptions.value = PICKER_TYPE_OPS
    }
    if (val === 'van-field') {
      typeOptions.value = TEXT_TYPE_OPS
    }

    model.value.type = ''
  })

  return {
    uiOptions,
    typeOptions
  }
}
