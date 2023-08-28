<template>
  <a-col v-bind="colProps">
    <a-form-item :name="field"
      v-bind="formItemProps"
      :rules="getRules">
      <!-- 组件 -->
      <component v-if="componentMap[componentName]"
        :is="componentMap[componentName]"
        v-on="componentEvents"
        v-bind="componentProps"
        v-model:[modelValueType]="modelValue"
        :placeholder="componentProps.placeholder??formItemProps.label"
      >
        <!-- 渲染组件自带的slot -->
        <template v-for="[slotName, slotFn] in Object.entries(componentSlots)"
          #[slotName]="slotData"
          :key="slotName">
          <component :is="slotFn({ slotData })"
            :key="slotName"></component>
        </template>
      </component>
      
      <!-- 自定义slot -->
      <div class="flex items-center">
        <template v-for="slotName in Object.keys($slots)" >
          <slot :name="slotName"
            v-if="filter?.slots?.includes(slotName)"
            :key="slotName" v-bind="{formModel, value: 'form-item'}">
          </slot>
        </template>
      </div>
    </a-form-item>
  </a-col>
</template>
<script setup lang="tsx">
import { PropType, computed } from 'vue';
import { componentMap } from './componentMap'
defineOptions({
  name: 'filterFormItem',
});
const props = defineProps({
  filter: {
    type: Object as PropType<{
      slot: string
      colProps: any
      field: string
      formItemProps: any
      componentEvents: any
      /** 手动指定v-model绑定的key */
      vModelKey: string
      componentProps: any
      componentName: string
      componentSlots: any
    }>
  },
  formModel: {
    type: Object as PropType<{
      [key: string]: any
    }>,
    required: true
  }
});
const emit = defineEmits<{
  (event: 'update:formModel', value: {[key:string]: any}): void
}>()
const {
  colProps,
  componentName,
  field
} = props.filter || {};
const getRules = computed(() => {
  return props.filter?.formItemProps.rules
})
const formItemProps = computed(() => {
  return props.filter?.formItemProps
})
const componentEvents = computed(() => {
  return props.filter?.componentEvents
})
const componentProps = computed(() => {
  return props.filter?.componentProps
})
const componentSlots = computed(() => {
  console.log(Object.entries(props.filter?.componentSlots ?? {}))
  return props.filter?.componentSlots ?? {}
})
const modelValueType = computed<string>(() => {
  return componentProps.vModelKey || 'value';
});
const modelValue = computed({
  get () {
    return props.formModel[field]
  },
  set (val) {
    props.formModel[field] = val;
    emit('update:formModel', props.formModel);
  },
});

</script>