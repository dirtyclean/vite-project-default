<!-- /*
 * @Author: dirtyclean 
 * @Date: 2023-07-26 10:33:17 
 * @Last Modified by:   dirtyclean 
 * @Last Modified time: 2023-07-26 10:33:17 
 * 默认（后端）分页pagination=undefined
 * web分页：表示从后台获取全部数据，由前端分页
 * pagination=false时：表示不分页
 * usePagination：当current、pageSize改变，会自动调用run
 */ -->
<template>
  <a-table v-bind="tableBindValues"
    @change="handleTableChange">
    <template #[slotName]="data"
      v-for="slotName in Object.keys($slots)"
      :key="slotName">
      <slot :name="slotName"
        v-bind="data || {}"></slot>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { PropType, computed, getCurrentInstance, onMounted, reactive, ref, unref } from 'vue';
import { tableProps } from 'ant-design-vue/es/table';
import { omit } from 'lodash-es';
import type { TableProps } from 'ant-design-vue';
import { usePagination, useRequest } from 'vue-request';
import { paginationer } from './index.ts'
import { useVModel } from '@/hooks/useVModel'
defineOptions({
  name: 'simpleTable',
  inheritAttrs: false,
});
const emits = defineEmits(['change'])
const props = defineProps({
  ...tableProps(),
  webPagination: {
    type: Object as PropType<{
      current: number
      pageSize: number
    }>,
  },
  queryData: {
    type: Function
  }
})
const instance = getCurrentInstance()
const defaultPagination = paginationer()
const webPagination = props.webPagination ? reactive(defaultPagination) : false
// 数据查询
if (props.pagination === false || !!props.webPagination) {
  // 不分页、前端分页时，请求所有数据
  var { data, run, loading, cancel, refresh } = useRequest(props.queryData, {
    defaultParams: [],
  });
  if (webPagination) {
    webPagination.total = data?.value?.length
  }
} else {
  // 后端分页
  // usePagination：当current、pageSize改变，会自动调用run
  var {
    data,
    run,
    loading,
    current,
    pageSize,
    total,
    cancel,
    refresh
  } = usePagination(props.queryData, {
    defaultParams: [{
      page: defaultPagination.current,
      results: defaultPagination.pageSize
    }],
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'results',
    },
  });
}

const handleTableChange: TableProps['onChange'] = (
  pag: { pageSize: number; current: number },
  filters: any,
  sorter: any,
  ...args
) => {
  if (webPagination) {
    webPagination.current = pag?.current
    webPagination.pageSize = pag.pageSize!
  } else if (props.pagination === false) {
    run({
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    })
  } else {
    run({
      results: pag.pageSize!,
      page: pag?.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  emits('change', {
    pag,
    filters,
    sorter,
    ...args
  });
};

// 更新props
const innerProps = ref();
const tableBindValues = computed(() => {
  let pagination: any = false
  let dataSource = data?.value
  if (webPagination) {
    // 前端分页
    pagination = paginationer({
      total: webPagination.total,
      current: webPagination.current,
      pageSize: webPagination.pageSize,
    })
  } else if (props.pagination !== false) {
    // 后端分页
    pagination = paginationer({
      total: total.value,
      current: current.value,
      pageSize: pageSize.value,
    })
    dataSource = data?.value?.list
  }
  const result = Object.assign({
    tableLayout: 'fixed',
    loading: loading.value,
    dataSource,
    pagination
  }, {
    ...innerProps.value,
  })
  return result;
});
const setProps = (props) => {
  innerProps.value = { ...props };
};
const tableAction = {
  setProps,
  run,
  cancel, 
  refresh,
  pagination: computed(() =>{
    return tableBindValues.value.pagination
  })
}
defineExpose(tableAction);
onMounted(() => {
})
</script>