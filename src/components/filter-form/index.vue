<template>
  <a-form :ref="(el) => formRef = el"
    v-bind="formBindValues"
    :model="formModel">
    <a-row v-bind="rowProps">
      <slot name="formHeader"></slot>
      <slot>
        <template v-for="item in componentsData"
          :key="item.field">
          <filterFormItem :filter="item"
            v-model:form-model="formModel">
            <!-- 接收父组件的slot传下去；同时也接收子组件返回的参数，传上去给父组件 -->
            <template v-for="slotName in Object.keys($slots)"
              #[slotName]="data"
              :key="slotName">
              <slot :name="slotName"
                v-bind="data || {}"></slot>
            </template>
          </filterFormItem>
        </template>
      </slot>
      <slot name="formFooter"></slot>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
import { formProps, type FormProps } from 'ant-design-vue/es/form';
import filterFormItem from './form-item.vue';
import { computed, PropType, ref } from 'vue';
const formRef = ref()
defineOptions({
  name: 'filterForm',
});
const emit = defineEmits<{
  (event: 'update:values', value: boolean): void
}>()
const props = defineProps({
  ...formProps(),
  componentsData: {
    type: Array as PropType<{
      [key: string]: any
    }[]>
  },
  values: {
    type: Object as PropType<{
      [key: string]: any
    }>,
    default: () => { }
  },
  rowProps: {
    type: Object as PropType<{
      [key: string]: any
    }>,
    default: () => { }
  }
});
const formModel = computed({
  get () {
    return props.values
  },
  set (val) {
    emit('update:values', val);
  },
});
const innerProps = ref();
const setProps = (props) => {
  innerProps.value = { ...props };
};
const formBindValues = computed(() => {
  const result = Object.assign({
  }, {
    ...innerProps.value,
  })
  return result;
})
const instance = {
  formRef,
  formModel,
  formValidate: computed(() => {
    return formRef.value?.validate
  })
};
defineExpose(instance);
</script>
