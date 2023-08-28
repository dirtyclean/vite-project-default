/* eslint-disable */
/*
 * @Author: dirtyclean
 * @Date: 2021-11-16 15:45:48
 * @Last Modified by: dirtyclean
 * @Last Modified time: 2022-08-19 11:17:30
 */
import { createApp } from 'vue'
import Tooltip from '@/components/tooltip.vue'
const insertTooltip = el => {
    const tooltipDom = el.tip
    document.body.appendChild(tooltipDom)
    tooltipDom.addEventListener('mouseenter', () => {
        // console.log('移入tooltipDom')
        el.inTip = true
    })
    tooltipDom.addEventListener('mouseleave', () => {
        // console.log('移出tooltipDom')
        el.inTip = false
        removeTooltip(el)
    })
    const { top, left, width, height } = el.getClientRects()[0] // getClientRects针对文本区域；getBoundingClientRect是DOM元素到浏览器可视范围的距离（不包含页面看不见的部分）
    const { width: tooltipWidth, height: tooltipHeight } = tooltipDom.getBoundingClientRect()
    const { width: bodyWidth, height: bodyHeight, top: bodyTop, left: bodyLeft } = document.body.getBoundingClientRect()
    // console.log(
    //     document.body.getBoundingClientRect(),
    //     el.getClientRects()[0],
    //     tooltipDom.getBoundingClientRect(),
    //     document.body.scrollLeft,
    //     hasWindowScrollbar(),
    //     bodyTop,
    //     bodyLeft
    // )
    const triangleSize = 8
    // bodyTop body出现竖向滚动条时的处理, bodyLeft横向滚动条还有问题。现优化为简单粗暴的方式，有滚动条设置为fixed
    const position = {
        top: `
      top:${top - tooltipHeight - triangleSize}px;
      left:${left - (tooltipWidth / 2 - width / 2)}px;
    `,
        bottom: `
      top:${top + height + triangleSize}px;
      left:${left - (tooltipWidth / 2 - width / 2)}px;
    `,
        left: `
      top:${top - (tooltipHeight / 2 - height / 2)}px;
      left:${left - tooltipWidth - triangleSize}px;
    `,
        right: `
      top:${top - (tooltipHeight / 2 - height / 2)}px;
      left:${left + width + triangleSize}px;
    `,
        leftTop: `
      top:${top}px;
      left:${left - tooltipWidth - triangleSize}px
    `,
        leftBottom: `
      top:${top - (tooltipHeight - height)}px;
      left:${left - tooltipWidth - triangleSize}px
    `,
        rightTop: `
      top:${top}px;
      left:${left + width + triangleSize}px
    `,
        rightBottom: `
      top:${top - (tooltipHeight - height)}px;
      left:${left + width + triangleSize}px
    `,
        topLeft: `
      top:${top - tooltipHeight - triangleSize}px;
      left:${left}px
    `,
        topRight: `
      top:${top - tooltipHeight - triangleSize}px;
      left:${left + width - tooltipWidth}px
    `,
        bottomLeft: `
      top:${top + height + triangleSize}px;
      left:${left}px
    `,
        bottomRight: `
      top:${top + height + triangleSize}px;
      left:${left + width - tooltipWidth}px
    `
    }
    let positionValue
    if (el.instance.position && position[el.instance.position]) {
        positionValue = el.instance.position
    } else if (
        top > tooltipHeight + triangleSize &&
        left - (tooltipWidth / 2 - width / 2) > 0 &&
        left - (tooltipWidth / 2 - width / 2) + tooltipWidth < bodyWidth
    ) {
        // 放正上方
        positionValue = 'top'
    } else if (
        top < bodyHeight - height - triangleSize - tooltipHeight &&
        left - (tooltipWidth / 2 - width / 2) > 0 &&
        left - (tooltipWidth / 2 - width / 2) + tooltipWidth < bodyWidth
    ) {
        // 放正下方
        positionValue = 'bottom'
    } else if (
        left > tooltipWidth + triangleSize &&
        top - (tooltipHeight / 2 - height / 2) > 0 &&
        top - (tooltipHeight / 2 - height / 2) + tooltipHeight < bodyHeight
    ) {
        // 放正左方
        positionValue = 'left'
    } else if (
        left < bodyWidth - width - triangleSize - tooltipWidth &&
        top - (tooltipHeight / 2 - height / 2) > 0 &&
        top - (tooltipHeight / 2 - height / 2) + tooltipHeight < bodyHeight
    ) {
        // 放正右方
        positionValue = 'right'
    } else {
        if (left > tooltipWidth + triangleSize) {
            if (top - (tooltipHeight / 2 - height / 2) <= 0) {
                positionValue = 'leftTop'
                // console.log('左上')
            } else if (top - (tooltipHeight / 2 - height / 2) + tooltipHeight >= bodyHeight) {
                positionValue = 'leftBottom'
                // console.log('左下')
            }
        } else if (left < bodyWidth - width - triangleSize - tooltipWidth) {
            if (top - (tooltipHeight / 2 - height / 2) <= 0) {
                positionValue = 'rightTop'
                // console.log('右上')
            } else if (top - (tooltipHeight / 2 - height / 2) + tooltipHeight >= bodyHeight) {
                positionValue = 'rightBottom'
                // console.log('右下')
            }
        } else if (top > tooltipHeight + triangleSize) {
            if (left - (tooltipWidth / 2 - width / 2) <= 0) {
                // console.log('上左')
                positionValue = 'topLeft'
            } else if (left - (tooltipWidth / 2 - width / 2) + tooltipWidth >= bodyWidth) {
                // console.log('上右')
                positionValue = 'topRight'
            }
        } else if (top < bodyHeight - height - triangleSize - tooltipHeight) {
            if (left - (tooltipWidth / 2 - width / 2) <= 0) {
                // console.log('下左')
                positionValue = 'bottomLeft'
            } else if (left - (tooltipWidth / 2 - width / 2) + tooltipWidth >= bodyWidth) {
                // console.log('下右')
                positionValue = 'bottomRight'
            }
        }
    }
    if (positionValue) {
        tooltipDom.style.cssText = tooltipDom.style.cssText + position[positionValue]
        tooltipDom.setAttribute('tip-position', positionValue)
        el.instance.setPosition(positionValue)
        const scorllbar = hasWindowScrollbar()
        if (scorllbar.x || scorllbar.y) {
            // 简单粗暴的方式，有滚动条设置为fixed
            tooltipDom.style.position = 'fixed'
        }
    } else {
        removeTooltip(el)
        el.setAttribute('title', el.instance.text)
    }
}
const removeTooltip = el => {
    try {
        // 找到浮层元素并移除
        el.tip && document.body.removeChild(el.tip)
        delete el.tip
    } catch (error) {}
}
// 参考element table show-overflow-tooltip 源码
const textRange = el => {
    const textContent = el
    const targetW = textContent.getBoundingClientRect().width
    const range = document.createRange()
    range.setStart(textContent, 0)
    range.setEnd(textContent, textContent.childNodes.length)
    const rangeWidth = range.getBoundingClientRect().width
    // console.log(rangeWidth, targetW, el.scrollWidth, el.clientWidth)
    return rangeWidth > targetW
}
// 判断window出现滚动条
const hasWindowScrollbar = () => {
    return {
        x: document.body.scrollWidth > (window.innerWidth || document.documentElement.clientWidth),
        y: document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
    }
}
export default {
    mounted(el, binding, vnode) {
        // 给当前元素设置超出隐藏
        el.style.display = 'block'
        el.style.overflow = 'hidden'
        el.style.textOverflow = 'ellipsis'
        el.style.whiteSpace = 'nowrap'
        // 鼠标移入
        el.addEventListener('mouseover', () => {
            // 判断是否需要显示tooltip
            if (textRange(el) && !el.tip) {
                const vm = vnode.context
                const textExr = el.getAttribute('tip-text') || el.innerText
                const backgroundExr = el.getAttribute('tip-background')
                const customClassExr = el.getAttribute('tip-custom-class')
                const positionExr = el.getAttribute('tip-position')
                const tip = createApp(Tooltip, {
                    text: (vm && vm[textExr]) || textExr,
                    background: (vm && vm[backgroundExr]) || backgroundExr,
                    customClass: (vm && vm[customClassExr]) || customClassExr,
                    position: (vm && vm[positionExr]) || positionExr
                }).mount(document.createElement('div'))
                // console.log('显示tooltip', tip)
                el.instance = tip
                el.tip = tip.$el
                insertTooltip(el)
            }
        })
        // 鼠标移出
        el.addEventListener('mouseout', () => {
            el.timer && clearTimeout(el.timer)
            el.timer = setTimeout(() => {
                // 移到tooltip内则不用remove
                // 不能通过鼠标位置与tooltipDom的位置来判断，因为这里的e不是鼠标当前位置
                if (el.inTip) {
                    // console.log('在元素内')
                } else {
                    removeTooltip(el)
                    // console.log('在元素外')
                }
            }, 200)
        })
    },
    // 指令与元素解绑时
    unmounted(el) {
        removeTooltip(el)
    }
}
