<template>
  eventbus
  <DemosEventBusA />
  <DemosEventBusB />
  <a-button @click="goToCustomModal">跳去custom-modal</a-button>
</template>
<script setup lang="ts">
import { useEventbus, EVT_ENUM } from '@/hooks/useEventbus/sysEvtBus.ts'
const router = useRouter();
const uid = getCurrentInstance().uid;
const { REG_ON_EVT } = useEventbus()

const csCallBackFn = (params) => {
  console.log(params)
}
REG_ON_EVT(uid, EVT_ENUM.CS, csCallBackFn)
const goToCustomModal = () =>{
  
  console.log(router, '===router===')
  router.push('/custom-modal');
}
</script>