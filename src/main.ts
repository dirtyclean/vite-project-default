import 'virtual:windi.css'
import 'virtual:windi-devtools'
import 'virtual:svg-icons-register'
import '@/assets/styles/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupDirectives, setupGlobalMethods, setupCustomComponents, setupGlobalVariables } from '@/plugins'

const app = createApp(App)
// 注册全局自定义组件,如：<svg-icon />
setupCustomComponents(app)
// 注册全局自定义指令，如：v-permission权限指令
setupDirectives(app)
// 注册全局方法，如：app.config.globalProperties.$message = message
setupGlobalMethods(app)
setupGlobalVariables(app)
// 挂载路由
setupRouter(app)
router.isReady().then(() => app.mount('#app')) as any
export default app.config.globalProperties
