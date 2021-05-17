<template>
  <div class="form-item">
    <div class="form-item-title">
      {{schema.title}}
      <span :style="{color: invalidText ? '#ff4d4f' : ''}">
        {{invalidText && invalidText}}
      </span>
    </div>
    <el-input
      v-model="modelValue"
      @input="handleOnChange"
      :disabled="disabled || readOnly"
    />
  </div>
</template>

<script>
import { toRefs } from "vue";
import { ElInput } from 'element-plus'

export default {
  name: 'LowInput',
  components: {
    [ElInput.name]: ElInput
  },
  props: {
    schema: Object,
    formData: Object,
    name: String,
    onChange: Function,
    modelValue: [String, Number, Boolean, Object],
    disabled: Boolean,
    readOnly: Boolean,
    invalidText: String,
  },
  setup(props, { emit }) {
    const { name } = toRefs(props)
    const handleOnChange = (val) => {
      let data = { name: name.value, value: val }
      props.onChange(data)
    }
    return {
      handleOnChange
    }
  },
};
</script>
