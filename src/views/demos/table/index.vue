<template>
  <filterForm></filterForm>
  <simpleTable :webPagination="webPagination"
    @change="handleTableChange">
    <template #headerCell="data">
      <span>{{ data.title }}</span>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <a @click="delData(record)">删除</a>
      </template>
    </template>
  </simpleTable>
  <a-button @click="props.size = 'small'"
    class="mr-10px">props改变</a-button>
  <a-button @click="webPagination = !webPagination;"
    class="mr-10px">component-props改变, 是否web分页{{ webPagination }}</a-button>
  <a-button @click="props.pagination = false;">不分页</a-button>
</template>
<script setup lang="ts">
import { useTable } from '@/hooks/useTable';
import { useForm } from '@/hooks/useForm'
import { filterData } from './filter'
console.log(filterData)
import axios from 'axios'
import { computed, reactive } from 'vue';
const webPagination = ref(false)
const columns = [
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    customRender: ({ text }) => {
      return text + '=='
    }
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '住址',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
]

type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};
type APIResult = {
  results: {
    gender: 'female' | 'male';
    name: string;
    email: string;
  }[];
};
const queryData = (params: APIParams) => {
  console.log('queryData', params, formValues)
  if (webPagination.value || props.pagination === false) {
    console.log('webPagination')
    return axios.get<APIResult>('https://randomuser.me/api?noinfo&page=1&results=200').then((res) => {
      return res.data.results
    })
  }
  if (props.pagination !== false) {
    return axios.get<APIResult>('https://randomuser.me/api?noinfo', { params }).then((res) => {
      return {
        list: res.data.results,
        total: 200
      }
    })
  }
};
const delData = (record) => {
  console.log(record)
  // fetch后
  console.log(methods.value)
  methods.value.refresh()
}
const handleTableChange = (
  params
) => {
  console.log('handleTableChange:', params)
};
const props = reactive({
  columns,
  size: 'middle',
  queryData,
})
const [simpleTable, methods] = useTable(props);
const formValues = reactive({
  name: '默认名字'
})
const [filterForm] = useForm({
  componentsData: filterData,
  values: formValues
})
watch(formValues, (newValue, oldValue) => {
  console.log('Values changed:', newValue, methods.value.pagination);
  methods.value.run({
    results: methods.value.pagination.pageSize,
    page: 1,
  })
}, { deep: true });
</script>