import { ref } from 'vue'

export default function useForm() {
  const model = ref({ choice: [] })
  const rules = ref({
    choice: [
      {
        validator: (rules, value, cb) => {
          console.log('vvvvv')
          console.log(value)
          if (value && value.length !== 0) {
            if (value.some(v => !v.value || !v.label)) {
              return cb(new Error('选项不能为空'))
            }
          }
          cb()
        }
      }
    ]
  })
  return {
    model,
    rules
  }
}
