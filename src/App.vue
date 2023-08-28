<template>
  <a-config-provider :locale="zhCN">
      <router-view v-slot="{ Component }">
          <template v-if="Component">
              <component :is="Component" />
          </template>
      </router-view>
  </a-config-provider>
</template>

<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}


</style>
