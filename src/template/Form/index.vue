<template>
  <div class="form-wrapper">
    <van-form @submit="onSubmit">
      <template
        v-for="(e) in items"
        :key="e.key"
      >
        <component
          v-if="e.ui === 'van-field'"
          v-model="model[e.key]"
          :rules="e.rules"
          :is="e.ui"
          v-bind="{ ...e }"
        ></component>
      </template>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button } from 'vant'
import { reactive, toRefs } from "vue";
import { InjectPropsListMap, Data, Props } from "./index";
import axios from 'axios'

export default {
  tplData: { ...Data },
  tplProps: { ...Props },
  name: 'TplForm',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  props: {
    ...InjectPropsListMap,
  },
  setup(props) {
    const { env, url } = toRefs(props)
    const data = reactive({
      model: {}
    });
    const dataAsRefs = toRefs(data);

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

    return {
      ...dataAsRefs,
      onSubmit
    };
  },
};
</script>

<style>
</style>