<template>
  <FilterForm :componentsData="componentsData"
    :values="values">

      <template #switch1>
        <a-switch />
      </template>
      <template #input1="params">
        <a-input :value="params.value" />
      </template>

  </FilterForm>
  <div class="float-right">
    <a-button  @click="handleOk">确定</a-button>
  </div>
  
</template>
<script lang="tsx" setup>
import { useForm } from '@/hooks/useForm.tsx'
import { reactive } from 'vue';
import { SmileOutlined, MehOutlined } from '@ant-design/icons-vue';
const values = reactive({
  name: 'zj'
})
const [FilterForm, instance] = useForm({
  rowProps: {
    gutter: 20
  }
})
console.log(instance, '===instance===', instance.value)
const componentsData = computed(() => {
  return [{
    field: 'name',
    componentName: 'Input',
    colProps: {
      span: 12,
    },
    componentProps: {

    },
    formItemProps: {
      label: '姓名',
      rules: [{
        required: true, message: 'Please input your username!', validator: (rule, value, callback) => {
          console.log(value, 'validator')
          if (!value) return callback(new Error('error'))
          callback()
        }
      }]
    },
    componentEvents: {
      change (e) {
        console.log(e, '====姓名onChange====')
      }
    }
  }, {
    field: 'age',
    componentName: 'Select',
    colProps: {
      span: 12,
    },
    formItemProps: {
      label: '年龄',
      rules: { required: !!instance?.value?.formModel.name, message: 'age必填' },
    },
    componentProps: {
      placeholder: '请选择年龄',
      options: [
        {
          label: '18',
          value: '18',
          key: '18',
        },
        {
          label: '19',
          value: '19',
          key: '19',
        },
      ],
    },
    componentEvents: {
      change (e) {
        console.log(e, '====年龄onChange====')
      }
    },
    componentSlots: {
      suffixIcon: (values) => {
        console.log('age componentSlots values', values);
        return <div id='az'>123</div>
      },
    }
  }, {
    field: 'gender',
    componentName: 'Select',
    colProps: {
      span: 12,
    },
    formItemProps: {
      label: '性别',
      rules: { required: !!instance?.value?.formModel.name, message: '性别必填' },
    },
    componentSlots: {
      tagRender: (values) => {
        console.log('tagRender componentSlots values', values);
        return <div id='tagRender'>tagRender</div>
      },
    },
    componentProps: {
      placeholder: '请选择性别',
      mode: "multiple",
      options: [
        {
          label: '男',
          value: '男',
          key: '男',
        },
        {
          label: '女',
          value: '女',
          key: '女',
        },
      ],
    },
    componentEvents: {
      change (e) {
        console.log(e, '====性别onChange====')
      }
    }
  }, {
    field: 'city',
    componentName: 'Cascader',
    colProps: {
      span: 12,
    },
    componentProps: {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ]
        }],
    },
    formItemProps: {
      label: '城市',
      rules: []
    },
    componentEvents: {
      change (e) {
        console.log(e, '====城市onChange====')
      }
    },
    componentSlots: {

    }
  }, {
    field: 'slots',
    colProps: {
      span: 24,
    },
    formItemProps: {
      label: '自定义slot',
      rules: []
    },
    slots: ['switch1', 'input1'],
  }]
})


const handleOk = () => {
  instance.value.formValidate().then((res) => {
    console.log('values', res);
  })
    .catch(error => {
      console.log('error', error);
    });
}

</script>

