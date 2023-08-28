import { App } from 'vue'

import { SvgIcon } from '@/components/svg-icon'
import emptyData from '@/components/emptyData.vue'
/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
    app.component(SvgIcon.name, SvgIcon)
    app.component(emptyData.name, emptyData)
}
