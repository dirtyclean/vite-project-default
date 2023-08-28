<template>
    <div class="relative w-full h-full">
        <div class="position-center">
            <span>{{ text }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'emptyData'
})
withDefaults(
    defineProps<{
        text?: string
    }>(),
    {
        text: '暂无数据'
    }
)
</script>

<style lang="scss" scoped>
span {
    color: #fff;
}
</style>
