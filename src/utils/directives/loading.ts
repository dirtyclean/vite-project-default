/* eslint-disable */
/*
 * @Author: dirtyclean
 * @Date: 2021-07-19 11:07:57
 * @Last Modified by: dirtyclean
 * @Last Modified time: 2022-10-16 14:52:26
 */
import { nextTick, createApp } from 'vue'
import Loading from '@/components/loading.vue'
const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
const camelCase = function (name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter
    })
}
const getMaxZIndex = () => {
    return [...document.getElementsByTagName('*')].reduce(
        (r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0),
        0
    )
}

const getStyle = function (element, styleName) {
    if (!element || !styleName) return null
    styleName = camelCase(styleName)
    return element.style[styleName]
}
const removeClass = function (element, className) {
    element.classList.remove(className)
}
const addClass = function (element, className) {
    element.classList.add(className)
}
const toggleLoading = function (el, binding) {
    if (binding.value) {
        nextTick(() => {
            if (binding.modifiers.fullscreen) {
                el.originalPosition = getStyle(document.body, 'position')
                el.maskStyle.zIndex = getMaxZIndex() + 1
                insertDom(document.body, el)
            } else {
                // 是否要绑定在 body 上
                if (binding.modifiers.body) {
                    el.originalPosition = getStyle(document.body, 'position')
                    const p = ['top', 'left']
                    const h = ['height', 'width']
                    p.forEach(property => {
                        const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
                        el.maskStyle[property] =
                            el.getBoundingClientRect()[property] +
                            document.body[scroll] +
                            document.documentElement[scroll] -
                            ~~parseInt(getStyle(document.body, `margin-${property}`), 10) +
                            'px'
                    })
                    h.forEach(property => {
                        el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px'
                    })
                    insertDom(document.body, el)
                } else {
                    el.originalPosition = getStyle(el, 'position')
                    insertDom(el, el)
                }
            }
        })
    } else {
        const target = binding.modifiers.fullscreen || binding.modifiers.body ? document.body : el
        removeClass(target, 'loading-parent--relative')
        el.instance.setVisible(false)
    }
}
const insertDom = (parent, el) => {
    Object.keys(el.maskStyle).forEach(property => {
        el.mask.style[property] = el.maskStyle[property]
    })
    if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        addClass(parent, 'loading-parent--relative')
    }
    parent.appendChild(el.mask)
    nextTick(() => {
        el.instance.setVisible(true)
    })
}
export default {
    beforeMount(el, binding, vnode) {
        const textExr = el.getAttribute('loading-text')
        const backgroundExr = el.getAttribute('loading-background')
        const customClassExr = el.getAttribute('loading-custom-class')
        const sizeExr = el.getAttribute('loading-size')
        const vm = vnode.context
        const mask = createApp(Loading, {
            fullscreen: !!binding.modifiers.fullscreen,
            text: (vm && vm[textExr]) || textExr,
            background: (vm && vm[backgroundExr]) || backgroundExr,
            customClass: (vm && vm[customClassExr]) || customClassExr,
            size: (vm && vm[sizeExr]) || sizeExr
        }).mount(document.createElement('div'))
        el.instance = mask
        el.mask = mask.$el
        el.maskStyle = {}
        binding.value && toggleLoading(el, binding)
    },
    updated(el, binding) {
        el.instance && el.instance.setText(el.getAttribute('loading-text'))
        if (binding.oldValue !== binding.value) {
            toggleLoading(el, binding)
        }
    },
    unmounted(el, binding) {
        el.mask && el.mask.parentNode && el.mask.parentNode.removeChild(el.mask)
        toggleLoading(el, { value: false, modifiers: binding.modifiers })
    }
}
