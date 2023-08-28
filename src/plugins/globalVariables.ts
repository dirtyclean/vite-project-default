import { App } from 'vue'
export function setupGlobalVariables(app: App) {
    app.config.globalProperties.$dhtLink = import.meta.env.VITE_DHT_LINK
}
