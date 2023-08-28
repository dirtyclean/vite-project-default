<template>
    <amap />
</template>

<script setup lang="ts">
import { h } from 'vue'
defineOptions({
    name: 'amapLoad'
})
const emits = defineEmits(['loaded'])
const amap = {
    render(createElement) {
        console.log(createElement, 'createElement')
        return h('script', {
            type: 'text/javascript',
            src: '//webapi.amap.com/maps?v=2.0&plugin=AMap.DistrictLayer,AMap.MapType,AMap.DistrictSearch,AMap.CircleEditor&key=89ebe97ddde9bd13a38324881ab22d66',
            onLoad() {
                emits('loaded')
            }
        })
    }
}
</script>

<style lang="scss" scoped>
span {
    color: #fff;
}
</style>
