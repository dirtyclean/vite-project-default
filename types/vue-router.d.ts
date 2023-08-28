export {}

interface Title18n {
    zh_CN: string
    en_US: string
}

declare module 'vue-router' {
    interface RouteMeta extends Record<string | number | symbol, unknown> {
        /** 标题 */
        title: string | Title18n
        /** 菜单图标 */
        icon?: string
    }
}
