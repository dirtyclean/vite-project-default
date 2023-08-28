/*
 * @Author: dirtyclean
 * @Date: 2021-07-05 10:17:12
 * @Last Modified by: dirtyclean
 * @Last Modified time: 2023-07-18 17:23:15
 */
import EVT_ENUM_CONST from './sysEvtEnum.js'
import mitt from 'mitt'
const EVT_BUS = mitt()
const eventRegs = new Map()
// 注册
function regOnEvent(vueName: string, evtType: string, evtHandler, uid: string) {
    tryOnUnmounted(() => {
        console.log('EVT_BUS.all: ', EVT_BUS.all)
        regOffEvent(vueName)
    })
    let vueEvtMap = new Map()
    if (eventRegs.has(vueName)) {
        vueEvtMap = eventRegs.get(vueName)
    } else {
        vueEvtMap = new Map()
        eventRegs.set(vueName, vueEvtMap)
    }
    if (uid) {
        evtType += uid
        console.log('事件名', vueName + '[' + evtType + ']')
    }
    if (!vueEvtMap.has(evtType)) {
        EVT_BUS.on(evtType, evtHandler)
        vueEvtMap.set(evtType, evtHandler)
        return
    }
    console.log('已注册事件', vueName + '[' + evtType + ']')
}
// 清理
function regOffEvent(vueName: string) {
    console.log('Clear Event Begin--', vueName)
    if (eventRegs.has(vueName)) {
        const vueEvtMap = eventRegs.get(vueName)
        vueEvtMap.forEach((value, key) => {
            EVT_BUS.off(key, value)
        })
        const beforeCnt: number = vueEvtMap.size
        vueEvtMap.clear()
        console.log('[' + vueName + '] 清理事件 Cnt:', beforeCnt, '-->', vueEvtMap.size)
    }
}
// 触发
function raiseEvent(evtType: string, evtParam, uid: string) {
    if (uid) {
        evtType += uid
        console.log('[raise]', evtType)
    }
    EVT_BUS.emit(evtType, evtParam)
}
export const REG_ON_EVT = regOnEvent
export const RAISE_EVT = raiseEvent
export const REG_OFF_EVT = regOffEvent
export const EVT_ENUM = EVT_ENUM_CONST
export const useEventbus = () => {
    return {
        REG_ON_EVT,
        RAISE_EVT,
        REG_OFF_EVT,
        EVT_ENUM
    }
}