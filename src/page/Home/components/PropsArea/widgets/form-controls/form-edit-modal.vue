<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    :width="width"
    v-bind="$attrs"
  >
    <el-form ref="elForm" :model="model" :rules="rules" label-position="right" label-width="60px">
      <el-form-item prop="key" label="key" required>
        <el-input v-model="model.key" placeholder="用于联调接口文档" />
      </el-form-item>
      <el-form-item prop="label" label="文本" required>
        <el-input v-model="model.label" placeholder="字段名称" />
      </el-form-item>
      <el-form-item v-if="isCreate"  prop="ui" label="组件" required>
        <el-select v-model="model.ui"  placeholder="表单组件">
          <el-option v-for="item in uiOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="showTypePicker" prop="type" label="类型" required>
        <el-select style="width: 100%" v-model="model.type"  placeholder="组件的具体属性，如password、time..">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="showChoiceOps"  prop="choice" label="选项">
        <div class="choice-wrapper">
          <div class="choice-input-wrapper" v-for="(item, index) in model.choice" :key="index">
            <el-input v-model="item.value" size="small" placeholder="key" />
            <span class="chocie-splitline"> - </span>
            <el-input v-model="item.label" size="small" placeholder="value" />
          </div>
          <div class="choice-btns">
            <el-button size="small" type="primary" @click="handleAddChoice">添加选项</el-button>
          </div>
        </div>
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
import { toRefs, ref, computed } from 'vue'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus'
import { UPDATE_MODEL_EVENT } from '@/utils/constants.js'
import useWath from './useWatch.js'
import useForm from './useForm.js'

export default {
  components: {
    [ElForm.name]: ElForm,
    [ElFormItem.name]: ElFormItem,
    [ElInput.name]: ElInput,
    [ElDialog.name]: ElDialog,
    [ElButton.name]: ElButton,
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption
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
      default: () => {}
    },
    type: {
      // edit create
      type: String,
      default: 'edit'
    }
  },
  emits: ['add', 'edit', UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    const { modelValue, form, type } = toRefs(props)
    const elForm = ref(null)
    const dialogVisible = ref(modelValue.value)

    const { model, rules } = useForm()
    const { uiOptions, typeOptions } = useWath({ modelValue, form, dialogVisible, model }, ctx)

    const isCreate = computed(() => type.value === 'create')
    const showTypePicker = computed(() => {
      const ui = model.value.ui
      console.log(ui)
      return ui && ['van-field', 'van-datetime-picker'].includes(ui)
    })

    const showChoiceOps = computed(() => {
      const ui = model.value.ui
      return ui && ['van-checkbox-group'].includes(ui)
    })

    const onConfirm = () => {
      elForm.value.validate((valid) => {
        if (!valid) return console.error('[Valid Error]: valid failed')
        const eventName = isCreate.value ? 'add' : 'edit'
        ctx.emit(eventName, {
          ...model.value
        })
        model.value = { chocie: [] }
        dialogVisible.value = false
      })
    }

    const handleAddChoice = () => {
      if (!model.value.choice) {
        model.value.choice = []
      }
      model.value.choice.push({
        value: '',
        label: ''
      })
    }

    return {
      dialogVisible,
      onConfirm,
      model,
      rules,
      uiOptions,
      typeOptions,
      isCreate,
      showTypePicker,
      handleAddChoice,
      elForm,
      showChoiceOps
    }
  }
}
</script>

<style lang="stylus" scoped>

:deep() .el-form-item {
  display: flex;

  .el-form-item__content {
    flex: 1;
    margin-left: 10px !important;
  }
}

.choice-wrapper {
  display: flex;
  flex-direction: column;

  .choice-input-wrapper {
    display: flex;
    align-items: center;

    .chocie-splitline {
      margin: 0 20px;
    }
  }

  .choice-btns {
    text-align: right;
  }
}
</style>
