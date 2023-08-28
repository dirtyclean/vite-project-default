import { nextTick, ref, unref, watch } from 'vue';
import FilterForm from '@/components/filter-form/index.vue';

export function useForm (props) {
  const formRef = ref(null);

  async function getFormInstance () {
    await nextTick();
    const form = unref(formRef);
    if (!form) {
      console.error('未获取表单实例!');
    }
    return form;
  }
  watch(
    () => props,
    async () => {
      if (props) {
        await nextTick();
        const formInstance = await getFormInstance();
        // console.log('form onMounted');
        formInstance.setProps?.(props);
      }
    },
    {
      immediate: true,
      deep: true,
      flush: 'post',
    },
  );

  const methods = new Proxy(formRef, {
    get (target, key) {
      if (Reflect.has(target, key)) {
        return unref(target);
      }
      if (target.value && Reflect.has(target.value, key)) {
        return Reflect.get(target.value, key);
      }
      return async (...rest) => {
        const form = await getFormInstance();
        return form?.[key]?.(...rest);
      };
    },
  });

  const formRender = (
    compProps,
    { attrs, slots },
  ) => {
    return (
      <FilterForm
        ref={formRef}
        {...{ ...attrs, ...props, ...compProps }}
        v-slots={slots}
      ></FilterForm>
    );
  };

  return [formRender, unref(methods)] as const;
}
