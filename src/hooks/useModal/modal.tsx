import { defineComponent, watch, ref, computed, unref } from 'vue';
import { omit } from 'lodash-es';
import { ConfigProvider } from 'ant-design-vue';
import type { HookModalProps } from './types';
import { DraggableModal } from '@/components/draggable-modal';
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export type MyModalInstance = InstanceType<typeof MyModal>;

export const MyModal = defineComponent({
  components: { customModal: DraggableModal },
  props: {
    content: {
      type: [String, Function] as PropType<string | JSX.Element | (() => JSX.Element)>,
    },
    closeModal: Function,
    visible: Boolean,
    isAppChild: Boolean,
  },
  setup(props, { attrs, expose }) {
    const confirmLoading = ref<boolean>(false);

    const propsRef = ref({ ...attrs, ...props });

    const getProps = computed(() => {
      return { ...attrs, ...props, ...unref(propsRef) };
    });

    const bindValues = computed(() => {
      const _props = unref(getProps);

      return {
        ...omit(_props, ['onCancel', 'onOk', 'closeModal', 'isAppChild', 'content']),
        visible: _props.visible,
        confirmLoading: confirmLoading.value,
        onCancel: handleCancel,
        onOk: handleConfirm,
      };
    });

    const setVisible = (visible: boolean) => {
      propsRef.value.visible = visible;
    };

    const setProps = (props: HookModalProps) => {
      propsRef.value = {
        ...unref(getProps),
        ...props,
      };
    };

    watch(
      () => propsRef.value.visible,
      (val) => {
        Object.is(val, false) && props.closeModal?.();
      },
    );

    const handleConfirm = async (e: MouseEvent) => {
      confirmLoading.value = true;
      try {
        // @ts-ignore
        await unref(getProps)?.onOk?.(e);
        setVisible(false);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        confirmLoading.value = false;
      }
    };
    const handleCancel = async (e: MouseEvent) => {
      // @ts-ignore
      await unref(getProps)?.onCancel?.(e);
      setVisible(false);
    };

    // defineExpose 子组件是<script setup>声明时，父组件（非<script setup>）是不能直接访问子组件的方法，需要子组件手动的抛出才行
    // expose 使用expose函数来控制组件被ref时向外暴露的对象内容，借此来维护组件的封装性。
    expose({
      setProps,
      id: 123
    });

    return () => {
      const _props = unref(getProps);
      const { content, isAppChild } = _props;

      const Tag = content
      // 非响应式副本 unref
      return isAppChild ? (
        <customModal {...unref(bindValues)}><Tag /></customModal>
      ) : (
        <ConfigProvider locale={zhCN}>
          <customModal {...unref(bindValues)}><Tag /></customModal>
        </ConfigProvider>
      );
    };
  },
});
