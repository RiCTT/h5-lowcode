<template>
  <div class="form-wrapper">
    <van-form @submit="onSubmit">
      <template
        v-for="(e) in items"
      >
        <component
          v-if="e.ui === 'van-field'"
          v-model="model[e.key]"
          :rules="e.rules"
          :is="e.ui"
          v-bind="{ ...e }"
          :key="e.key"
        ></component>
        <template v-else-if="e.ui === 'van-datetime-picker'">
          <van-field v-model="model[e.key]" :key="e.key" readonly clickable @click="onOpenPicker(e)" :rules="e.rules" :label="e.label">
          </van-field>
        </template>
      </template>
      <!-- 统一的弹框选择 -->
      <van-popup v-model:show="picker.show" position="bottom">
        <van-datetime-picker
          :type="picker.type"
          @confirm="onConfirmPicker(picker.key, $event)"
          @cancel="onCancelPicker"
        />
      </van-popup>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Popup, Button, DatetimePicker, Switch, Checkbox } from 'vant'
import { reactive, toRefs } from 'vue'
import { InjectPropsListMap, Data, Props } from './index'
import axios from 'axios'

export default {
  tplData: { ...Data },
  tplProps: { ...Props },
  name: 'TplForm',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [DatetimePicker.name]: DatetimePicker,
    [Switch.name]: Switch,
    [Checkbox.name]: Checkbox,
    [Popup.name]: Popup
  },
  props: {
    ...InjectPropsListMap
  },
  setup(props) {
    const { env, url } = toRefs(props)
    const data = reactive({
      model: {},
      picker: {
        show: false,
        key: null,
        type: ''
      }
    })
    const dataAsRefs = toRefs(data)

    const onSubmit = (e) => {
      const host = env.value + url.value
      console.log('[Request Host]:', host)
      console.log('[Request Model]:', data.model)
      axios.get(host, { params: data.model })
        .then(res => {
          console.log('[Request Result]:')
          console.log(res)
        })
    }

    const onOpenPicker = (item) => {
      const { key, type } = item
      data.picker.show = true
      data.picker.key = key
      data.picker.type = type
    }

    const onConfirmPicker = (key, val) => {
      if (typeof val === 'object') {
        val = val.toLocaleDateString()
      }
      data.model[key] = val
      data.picker.show = false
    }

    const onCancelPicker = () => {
      data.picker.show = false
      data.picker.key = ''
      data.picker.type = ''
    }

    return {
      ...dataAsRefs,
      onSubmit,
      onConfirmPicker,
      onCancelPicker,
      onOpenPicker
    }
  }
}
</script>

<style>
</style>
