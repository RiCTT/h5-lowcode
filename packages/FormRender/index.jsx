import { toRefs } from "vue";
import { resolve } from "./utils/index.js";
import { widgets, mapping } from "./widgets";
import Input from './widgets/input.vue'

export default {
  name: 'FormRender',
  components: {
    [Input.name]: Input
  },
  props: {
    schema: Object,
    formData: Object,
    onChange: Function,
  },

  setup(props, { emit }) {
    if (!props.schema) return null;

    const { formData, schema } = toRefs(props);

    let data = resolve(props.schema, formData.value)


    const handleChange = (result) => {
      let { name, value } = result
      data[name] = value
      
      props.onChange(data)
    }

    return () => {
      const Field =
        widgets[
          mapping[
            `${props.schema.type}${
              props.schema.format ? `:${props.schema.format}` : ""
            }` 
          ]
        ];
      
      if (!Field) return <div>Field is Null</div>

      return (
        <div className="vue-form-render">
          <Field
            schema={props.schema}
            modelValue={data}
            onChange={handleChange}
          />
        </div>
      );
    };
  },
};
