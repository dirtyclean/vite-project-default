<!--
/*
 * @Author: dirtyclean 
 * @Date: 2021-07-17 16:11:22 
 * @Last Modified by: dirtyclean
 * @Last Modified time: 2022-09-11 17:00:10
 */
 api:
    修饰符  .fullscreen 全屏
            .body 是否要绑定在 body 上
    自定义属性  loading-text 显示的文字
               loading-background 背景颜色
               loading-custom-class 自定义class
               loading-size 取值：'default'/'large'/'small'

 -->
<template>
    <div
        class="loading-mask"
        v-show="visibleValue"
        :class="[customClass, { 'is-fullScreen': fullscreen }]"
        :style="{ backgroundColor: background || '' }"
    >
        <div
            class="ant-spin ant-spin-spinning"
            :class="size === 'small' ? 'ant-spin-sm' : size === 'large' ? 'ant-spin-lg' : ''"
        >
            <span class="ant-spin-dot ant-spin-dot-spin">
                <i class="ant-spin-dot-item"></i>
                <i class="ant-spin-dot-item"></i>
                <i class="ant-spin-dot-item"></i>
                <i class="ant-spin-dot-item"></i>
            </span>
            <div :class="'loading-text' + '-' + size">{{ textValue }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        fullscreen: Boolean,
        background: String,
        text: String,
        customClass: String,
        visible: Boolean,
        size: {
            type: String,
            default: 'default'
        }
    },
    data() {
        return {
            textValue: this.text,
            visibleValue: this.visible
        }
    },
    beforeUnmount() {
        console.log('beforeUnmount')
    },
    methods: {
        setText(text) {
            this.textValue = text
        },
        setVisible(visible) {
            this.visibleValue = visible
        }
    }
}
</script>

<style lang="scss">
.ant-spin {
    position: absolute;
    display: none;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    color: #1890ff;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    text-align: center;
    vertical-align: middle;
    list-style: none;
    opacity: 0;
    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    font-feature-settings: 'tnum';
}

.ant-spin-spinning {
    position: static;
    display: inline-block;
    opacity: 1;
}

.ant-spin-nested-loading {
    position: relative;
}

.ant-spin-nested-loading > div > .ant-spin {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    display: block;
    width: 100%;
    height: 100%;
    max-height: 400px;
}

.ant-spin-dot {
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
    font-size: 20px;
}

.ant-spin-lg .ant-spin-dot {
    font-size: 40px;
}

.ant-spin-lg .ant-spin-dot i {
    width: 14px;
    height: 14px;
}

.ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -10px;
}

.ant-spin.ant-spin-show-text .ant-spin-text {
    display: block;
}

.ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    position: absolute;
    top: 50%;
    width: 100%;
    padding-top: 5px;
    text-shadow: 0 1px 2px #fff;
}

.ant-spin-nested-loading > div > .ant-spin-lg .ant-spin-dot {
    margin: -16px;
}

.ant-spin-nested-loading > div > .ant-spin.ant-spin-show-text .ant-spin-dot {
    margin-top: -20px;
}

.ant-spin-nested-loading > div > .ant-spin-lg .ant-spin-text {
    padding-top: 11px;
}

.ant-spin-nested-loading > div > .ant-spin-lg.ant-spin-show-text .ant-spin-dot {
    margin-top: -26px;
}

.ant-spin-container {
    position: relative;
    transition: opacity 0.3s;
}

.ant-spin-container::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: none \9;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 0;
    transition: all 0.3s;
    content: '';
    pointer-events: none;
}

.ant-spin-blur {
    clear: both;
    overflow: hidden;
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
}

.ant-spin-blur::after {
    opacity: 0.4;
    pointer-events: auto;
}

.ant-spin-tip {
    color: rgba(0, 0, 0, 0.45);
}

.ant-spin-dot-item {
    position: absolute;
    display: block;
    width: 9px;
    height: 9px;
    background-color: #1890ff;
    border-radius: 100%;
    transform: scale(0.75);
    transform-origin: 50% 50%;
    opacity: 0.3;
    animation: antSpinMove 1s infinite linear alternate;
    animation: antSpinMove 1s infinite linear alternate;
}

.ant-spin-dot-item:nth-child(1) {
    top: 0;
    left: 0;
}

.ant-spin-dot-item:nth-child(2) {
    top: 0;
    right: 0;
    animation-delay: 0.4s;
}

.ant-spin-dot-item:nth-child(3) {
    right: 0;
    bottom: 0;
    animation-delay: 0.8s;
}

.ant-spin-dot-item:nth-child(4) {
    bottom: 0;
    left: 0;
    animation-delay: 1.2s;
}

.ant-spin-dot-spin {
    transform: rotate(45deg);
    animation: antRotate 1.2s infinite linear;
    animation: antRotate 1.2s infinite linear;
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    /* IE10+ */
    .ant-spin-blur {
        background: #fff;
        opacity: 0.5;
    }
}
@keyframes antSpinMove {
    to {
        opacity: 1;
    }
}
@keyframes antSpinMove {
    to {
        opacity: 1;
    }
}
@keyframes antRotate {
    to {
        transform: rotate(405deg);
    }
}
@keyframes antRotate {
    to {
        transform: rotate(405deg);
    }
}

.loading-parent--relative {
    position: relative !important;
}

.loading-mask {
    position: absolute;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: hsla(0, 0%, 100%, 0.5);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.3s;
}

.is-fullScreen {
    @extend .loading-mask;

    width: 100vw;
    height: 100vh;
}

.loading-text-default {
    font-size: 12px;
}

.loading-text-small {
    font-size: 16px;
}

.loading-text-large {
    font-size: 18px;
}
</style>
