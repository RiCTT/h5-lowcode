import { ref, toRefs, watch, reactive } from "vue";
import { resolve, clone, getValidateList } from "./utils/index.js";
import { widgets, mapping } from "./widgets";
import Input from './widgets/input.vue'

import { state } from '@/page/Home/store/index.js'


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
    const { editComponentList, currentSelectComponent } = state

    const { formData, schema } = toRefs(props);

    let data = resolve(props.schema, formData.value)


    const handleChange = (result) => {
      let { name, value } = result
      data[name] = value
      const { uid } = currentSelectComponent.value
      const target = editComponentList.value.find(item => {
        return item.uid === uid
      })
      target.formData = ref(data)
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
