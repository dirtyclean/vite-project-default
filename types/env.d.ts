// <reference types="vite/client" />

interface ImportMetaEnv {
    [x: string]: any
    readonly VITE_APP_TITLE: string
    readonly VITE_BASE_API: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
