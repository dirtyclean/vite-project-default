// Vite的Windi CSS又名按需Tailwind CSS
import { defineConfig } from 'vite-plugin-windicss'
export default defineConfig({
    attributify: true, // 属性化模式 基于这个特性，你可以在 html 属性中编写 windi 类
    darkMode: 'class', //  暗色模式 'class' or 'media'
    safelist: [],
    theme: {
        extend: {
        }
    },
    shortcuts: {
        'empty-center': 'w-full h-full flex flex-col items-center justify-center !m-0',
        'position-center': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
        'position-center-x': {
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        'position-center-y': {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)'
        },
    },
    plugins: [
        // 其他插件
        require('@windicss/plugin-animations')({
            settings: {
                animatedSpeed: 1000,
                heartBeatSpeed: 1000,
                hingeSpeed: 2000,
                bounceInSpeed: 750,
                bounceOutSpeed: 750,
                animationDelaySpeed: 1000
            }
        }),
        require('windicss/plugin/line-clamp') // 控制文本行数
    ]
})
