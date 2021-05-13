/**
 * props
 *  schema，对组件的描述
 *  formData，表单组件的初始值
 */

/* eslint-disable */
import { toRefs, watch, reactive } from "vue";
import { resolve, clone, getValidateList } from "./utils/index.js";
import { widgets, mapping } from "./widgets";


export default {
  name: 'FormRender',
  props: {
    schema: Object,
    formData: Object,
  },

  setup(props, { emit }) {
    if (!props.schema) return null;

    const { formData, schema } = toRefs(props);

    let data = resolve(props.schema, formData.value);


    emit("on-change", data);
    // watch(formData, () => {
    //   console.log('in watch')
    //   data = resolve(props.schema, formData.value);
    //   emit("on-validate", getValidateList(data, props.schema));
    // });

    // watch(schema.value, () => {
    //   console.log('in watch')
    //   data = resolve(props.schema, formData.value);
    //   emit("on-change", data);
    // });

    const handleChange = (key, val) => {
      emit("on-change", clone(val));
    };
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
            formData={data}
            value={data}
            onChange={handleChange}
          />
        </div>
      );
    };
  },
};
