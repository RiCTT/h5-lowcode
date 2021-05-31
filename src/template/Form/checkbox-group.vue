<template>
  <van-field :name="name" :label="label">
    <template #input>
      <van-checkbox-group v-model="groupChecked" direction="horizontal">
        <van-checkbox v-for="item in options" :key="item.value" :name="item.value" shape="square">{{item.label}}</van-checkbox>
      </van-checkbox-group>
    </template>
  </van-field>
</template>

<script>
import { Field, CheckboxGroup, Checkbox } from 'vant'
import { ref, toRefs, watch } from 'vue'
import { UPDATE_MODEL_EVENT } from '@/utils/constants.js'

export default {
  components: {
    [Field.name]: Field,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox
  },
  props: {
    name: String,
    label: String,
    modelValue: {
      type: Array,
      default: () => []
    },
    choice: {
      type: Array,
      default: () => []
    }
  },
  setup(props, ctx) {
    const { modelValue, choice } = toRefs(props)
    const groupChecked = ref(modelValue.value)
    const options = ref(choice.value)

    watch(groupChecked, (val) => {
      ctx.emit(UPDATE_MODEL_EVENT, val)
    })

    watch(choice, (val) => {
      options.value = val
    })
    return {
      props,
      options,
      groupChecked
    }
  }
}
</script>

<style>
</style>
