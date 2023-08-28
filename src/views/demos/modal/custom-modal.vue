<template>
  <div>
    <Alert message="自定义模态框"
      type="info"
      show-icon
      style="margin-bottom: 12px">
      <template #description>
        对ant-design-vue的modal进行二次封装，自定义一个可拖拽、可调整大小的模态框，
        <span class="text-red-500">
          Tips: 如果你的弹窗依赖于App上下文（provide/inject），你应该使用`useModal组件方式`
        </span>
        <a class="text-blue-500"
          target="_blank"
          href="https://github.com/buqiyuan/vite-vue3-admin/blob/main/src/views/demos/custom-modal.vue">
          查看源码
        </a>
      </template>
    </Alert>
    <a-card>
      <Space>
        <a-button type="primary"
          @click="state.visible = true">普通组件方式</a-button>
        <a-button type="primary"
          @click="handleOpenUseModal">useModal组件方式</a-button>
        <a-button type="primary"
          @click="handleOpenHookModal">hook纯函数式</a-button>
      </Space>
    </a-card>
    <DraggableModal v-model:visible="state.visible"
      @ok="onOk" />
    <!-- 等价于调用UseModalComp(), 会使isAppChild=true -->
    <UseModalComp></UseModalComp>
  </div>
</template>

<script setup lang="tsx">
import { reactive } from 'vue';
import { Alert, Space } from 'ant-design-vue';
import { DraggableModal } from '@/components/draggable-modal';
import { useModal } from '@/hooks/useModal/';

defineOptions({
  name: 'CustomModal',
});

/**
* @description 扩展ant-design-vue模态框功能
* const [fnModal] = useModal();
 这种写法假设使用useModal返回的是一个函数，通过解构赋值，将函数赋值给fnModal。可以通过调用fnModal()来控制弹框的显示与隐藏。
 const [UseModalComp] = useModal();
 这种写法假设使用useModal返回的是一个组件，通过解构赋值，将组件赋值给UseModalComp。然后，在渲染的时候可以直接通过​<UseModalComp />方式使用该组件，完成弹框的渲染和控制。
*/

const [fnModal] = useModal();
const [UseModalComp] = useModal();
const state = reactive({
  visible: false,
});

const handleOpenHookModal = () => {
  fnModal.show({
    title: '我是hook纯函数式模态框',
    content: () => {
      return <div>我是hook纯函数式模态框</div>
    },
  });
};
const handleOpenUseModal = () => {
  UseModalComp.show({
    title: '我是UseModalComp',
    content: defineAsyncComponent(() =>
      import('./form-modal.vue')
    ),
    width: '80%'
  });
};

const onOk = () => {
  state.visible = false;
};


import { useEventbus, EVT_ENUM } from '@/hooks/useEventbus/sysEvtBus.ts'
const router = useRouter();
const uid = getCurrentInstance().uid;
const { REG_ON_EVT } = useEventbus()

const bsCallBackFn = (params) => {
  console.log(params, uid)
}
REG_ON_EVT(uid, EVT_ENUM.BS, bsCallBackFn)
</script>

<style scoped></style>
