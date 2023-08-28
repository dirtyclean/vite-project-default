import { nextTick, ref, unref, watch } from 'vue';
import SimpleTable from '@/components/simple-table/index.vue';

export function useTable (props) {
  const tableRef = ref(null);

  async function getTableInstance () {
    await nextTick();
    const table = unref(tableRef);
    if (!table) {
      console.error('未获取表格实例!');
    }
    return table;
  }
  watch(
    () => props,
    async () => {
      if (props) {
        console.log('table onMounted', props);
        await nextTick();
        const tableInstance = await getTableInstance();
        tableInstance?.setProps?.(props);
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  const methods = new Proxy(tableRef, {
    get (target, key) {
      if (Reflect.has(target, key)) {
        return unref(target);
      }
      if (target.value && Reflect.has(target.value, key)) {
        return Reflect.get(target.value, key);
      }
      return async (...rest) => {
        const table = await getTableInstance();
        return table?.[key]?.(...rest);
      };
    },
  });
  const tableRender = (compProps, { attrs, slots }) => {
    console.log('tableRender')
    // 当tableProps、compProps变化时，都会重绘
    return (<SimpleTable ref={tableRef} {...{ ...attrs, ...props, ...compProps }} v-slots={slots} />)
  };
  return [tableRender, unref(methods)] as const;
}
