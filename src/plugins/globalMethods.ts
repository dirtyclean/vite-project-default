import { App } from 'vue'
import { REG_ON_EVT, RAISE_EVT, REG_OFF_EVT, EVT_ENUM } from './sysEvt/sysEvtBus'
/**
 * 注册全局方法
 * @param app
 */
export function setupGlobalMethods(app: App) {
    app.config.globalProperties.$REG_ON_EVT = REG_ON_EVT
    app.config.globalProperties.$RAISE_EVT = RAISE_EVT
    app.config.globalProperties.$REG_OFF_EVT = REG_OFF_EVT
    app.config.globalProperties.$EVT_ENUM = EVT_ENUM
}
