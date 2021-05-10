import { reactive, toRefs } from 'vue'

export const state = toRefs(reactive({
  count: 1
}))