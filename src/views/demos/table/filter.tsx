export const filterData = [{
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
}]