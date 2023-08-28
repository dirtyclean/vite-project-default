import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
const createRouterGuards = router => {
    router.beforeEach(async (to, from, next) => {
        document.title = to.meta.title
        next()
    })
}
export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: '首页'
        },
        redirect: '/modal',
        children: [
            {
                path: '/modal',
                name: 'modal',
                component: async () => await import('@/views/demos/modal/custom-modal.vue'),
                meta: {
                    title: 'modal'
                }
            },
            {
                path: '/event-bus',
                name: 'event-bus',
                component: async () => await import('@/views/demos/eventBus/index.vue'),
                meta: {
                    title: 'event-bus'
                }
            },
            {
                path: '/echart-pie',
                name: 'echart-pie',
                component: async () => await import('@/views/demos/echart-pie.vue'),
                meta: {
                    title: 'echart-pie'
                }
            },
            {
                path: '/table',
                name: 'table',
                component: async () => await import('@/views/demos/table/index.vue'),
                meta: {
                    title: 'table'
                }
            },
        ]
    },
]

export const router = createRouter({
    history: createWebHashHistory(''),
    routes
})

export function setupRouter (app: App) {
    app.use(router)
    createRouterGuards(router)
}

export default router
