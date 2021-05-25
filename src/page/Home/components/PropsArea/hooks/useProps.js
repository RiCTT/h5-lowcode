
export default function useProps() {
  return {
    modelValue: {
      type: [String, Number, Array, Object],
      default: ''
    },
    describe: {
      type: Object,
      default: () => {
        return {
          title: '',
          type: 'string',
          ui: 'input',
          required: false,
          rules: [],
          enumValue: [],
          enumLabel: []
        }
      }
    }
  }
}
