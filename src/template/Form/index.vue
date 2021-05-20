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
          :rules="model[e.rules]"
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
import { InjectPropsListMap } from "./index";

export default {
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
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请填写用户名' }],
        password: [{ required: true, message: '请填写密码' }]
      },
    });
    const dataAsRefs = toRefs(data);

    const onSubmit = (e) => {
      console.log(env)
      console.log(url)
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