<template>
  a
</template>
<script setup lang="ts">
import { useEventbus, EVT_ENUM } from '@/hooks/useEventbus/sysEvtBus.ts'
const { RAISE_EVT } = useEventbus()
RAISE_EVT(EVT_ENUM.CS, '我是a')
</script>