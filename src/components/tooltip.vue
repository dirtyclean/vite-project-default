<!--
/*
 * @Author: dirtyclean 
 * @Date: 2021-07-17 16:11:22 
 * @Last Modified by: dirtyclean
 * @Last Modified time: 2021-12-28 16:48:08
 */
 api:
    自定义属性  tip-text 显示的文字，不传则取innerText
               tip-background 背景颜色
               tip-custom-class 自定义class
               tip-position 显示的位置 top bottom left right leftTop leftBottom rightTop rightBottom topLeft topRight bottomLeft bottomRight12种, 
                不传入则程序自动判断tooltip应显示的位置,优先级则是按照上面顺序
    <div style="width:100px" v-tip>你数数一共多少个字</div>
 -->
<template>
    <div :class="['tip', customClass]" :style="{ backgroundColor: background || '' }">
        <div class="tip-text" v-html="text"></div>
        <div class="tip-triangle" :style="triangleStyle"></div>
    </div>
</template>

<script>
export default {
    props: {
        background: String,
        text: String,
        customClass: String,
        position: String
    },
    data() {
        return {
            positionValue: this.position
        }
    },
    computed: {
        triangleStyle() {
            if (!this.positionValue) return {}
            return {
                [`border-${this.positionValue.split(/(?=[A-Z])/)[0]}-color`]: this.background || ''
            }
        }
    },
    methods: {
        setPosition(position) {
            this.positionValue = position
        }
    }
}
</script>

<style lang="scss">
.tip {
    position: absolute;
    z-index: 999999;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 5px;
    padding: 10px;
}

.tip-text {
    max-width: 400px;
    max-height: 400px;
    overflow: auto;
    color: #fff;
    font-size: 12px;
}

.tip-triangle {
    position: absolute;
    border-style: solid;
    border-color: transparent;
    z-index: 999;
}

.tip[tip-position='bottom'] .tip-triangle {
    top: -8px;
    left: 50%;
    border-width: 0 8px 8px 8px;
    border-bottom-color: rgba(0, 0, 0, 0.75);
    transform: translateX(-50%);
}

.tip[tip-position='top'] .tip-triangle {
    top: 100%;
    left: 50%;
    border-width: 8px 8px 0 8px;
    border-top-color: rgba(0, 0, 0, 0.75);
    transform: translateX(-50%);
}

.tip[tip-position='left'] .tip-triangle {
    top: 50%;
    left: 100%;
    border-width: 8px 0 8px 8px;
    border-left-color: rgba(0, 0, 0, 0.75);
    transform: translateY(-50%);
}

.tip[tip-position='right'] .tip-triangle {
    top: 50%;
    left: -8px;
    border-width: 8px 8px 8px 0;
    border-right-color: rgba(0, 0, 0, 0.75);
    transform: translateY(-50%);
}

.tip[tip-position='leftTop'] .tip-triangle {
    top: 4px;
    left: 100%;
    border-width: 8px 0 8px 8px;
    border-left-color: rgba(0, 0, 0, 0.75);
}

.tip[tip-position='rightTop'] .tip-triangle {
    top: 4px;
    left: -8px;
    border-width: 8px 8px 8px 0;
    border-right-color: rgba(0, 0, 0, 0.75);
}

.tip[tip-position='leftBottom'] .tip-triangle {
    bottom: 4px;
    left: 100%;
    border-width: 8px 0 8px 8px;
    border-left-color: rgba(0, 0, 0, 0.75);
}

.tip[tip-position='rightBottom'] .tip-triangle {
    bottom: 4px;
    left: -8px;
    border-width: 8px 8px 8px 0;
    border-right-color: rgba(0, 0, 0, 0.75);
}

.tip[tip-position='bottomLeft'] .tip-triangle {
    left: 4px;
    top: -8px;
    border-width: 0 8px 8px 8px;
    border-bottom-color: rgba(0, 0, 0, 0.75);
}

.tip[tip-position='bottomRight'] .tip-triangle {
    right: 4px;
    top: -8px;
    border-width: 0 8px 8px 8px;
    border-bottom-color: rgba(0, 0, 0, 0.75);
}

.tip[tip-position='topLeft'] .tip-triangle {
    top: 100%;
    left: 4px;
    border-width: 8px 8px 0 8px;
    border-top-color: rgba(0, 0, 0, 0.75);
}

.tip[tip-position='topRight'] .tip-triangle {
    top: 100%;
    right: 4px;
    border-width: 8px 8px 0 8px;
    border-top-color: rgba(0, 0, 0, 0.75);
}
</style>
