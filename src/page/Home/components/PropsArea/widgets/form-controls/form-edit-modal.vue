<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    :width="width"
    v-bind="$attrs"
  >
    <el-form :model="model" :rules="rules" label-position="right" label-width="60px">
      <el-form-item prop="key" label="key" required>
        <el-input v-model="model.key" placeholder="用于联调接口文档" />
      </el-form-item>
      <el-form-item prop="label" label="文本" required>
        <el-input v-model="model.label" placeholder="字段名称" />
      </el-form-item>
      <el-form-item v-if="isCreate"  prop="ui" label="组件" required>
        <el-select v-model="model.ui"  placeholder="表单组件">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="showTypePicker" prop="type" label="组件类型" required>
        <el-select v-model="model.type"  placeholder="组件的具体属性，如password、time、timerange...">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="placeholder" label="占位符">
        <el-input v-model="model.placeholder" placeholder="输入框的默认提示文本内容" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script>
import { toRefs, ref, watch, computed } from 'vue'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus'
import { UPDATE_MODEL_EVENT } from '@/utils/constants.js'

const TEXT_TYPE_OPS = [
  { label: '普通文本', value: 'text' },
  { label: '密码', value: 'password' }
]

const PICKER_TYPE_OPS = [
  { label: '年月日', value: 'date' },
  { label: '年月', value: 'year-month' },
  { label: '月日', value: 'month-day' },
  { label: '时间', value: 'time' },
  { label: '完整时间', value: 'datetime' },
  { label: '年月日小时', value: 'datehour' }
]

export default {
  components: {
    [ElForm.name]: ElForm,
    [ElFormItem.name]: ElFormItem,
    [ElInput.name]: ElInput,
    [ElDialog.name]: ElDialog,
    [ElButton.name]: ElButton,
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption,
  },
  props: {
    title: {
      type: [String, Number]
    },
    width: {
      type: String,
      default: '30%'
    },
    modelValue: {
      type: [Boolean, String, Number],
      default: false
    },
    form: {
      type: Object,
      default: false,
    },
    type: {
      // edit create
      type: String,
      default: 'edit'
    },
  },
  emits: ['add', 'edit', UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    const { modelValue, form, type } = toRefs(props)
    const dialogVisible = ref(modelValue.value)
    const model = ref({})
    const rules = ref({})
    const options = ref([
      { label: '普通文本框', value: 'van-field' },
      { label: '开关', value: 'van-switch' },
      { label: '复选框', value: 'van-checkbox' },
      { label: '时间选择器', value: 'van-datetime-picker' }
    ])
    const typeOptions = ref(TEXT_TYPE_OPS)
    
    const isCreate = computed(() => type.value === 'create')
    const showTypePicker = computed(() => {
      let ui = model.value.ui
      console.log(ui)
      return ui && ['van-field', 'van-datetime-picker'].includes(ui)
    })

    watch(() => model.value.ui, (val) => {
      console.log('ui', val)
      if (val === 'van-datetime-picker') {
        typeOptions.value = PICKER_TYPE_OPS
      }
    })

    watch(form, (val) => {
      model.value = { ...val }
    })

    watch(modelValue, (val) => {
      dialogVisible.value = val
    })

    watch(dialogVisible, (val) => {
      ctx.emit(UPDATE_MODEL_EVENT, val)
    })

    const onConfirm = () => {
      const EventName = isCreate.value ? 'add' : 'edit'
      ctx.emit(EventName, {
        ...model.value
      })
      model.value = {}
      dialogVisible.value = false
    }

    return {
      dialogVisible,
      onConfirm,
      model,
      rules,
      options,
      typeOptions,
      isCreate,
      showTypePicker
    }
  }
};
</script>

<style lang="stylus" scoped>

:deep() .el-form-item {
  display: flex;

  .el-form-item__content {
    flex: 1;
    margin-left: 10px !important;
  }
}
</style>