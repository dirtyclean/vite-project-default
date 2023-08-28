import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
import moment from 'dayjs'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite'
import themeConfig from './theme'
import pxToVwPlugin from './pxToVwPlugin'
import { pxtoVwConfig } from './postcss.config.cjs'
import classPxToVwPlugin from 'postcss-px-to-viewport'
const CWD = process.cwd()
// 环境变量
// const BASE_ENV_CONFIG = loadEnv('', CWD);
// const DEV_ENV_CONFIG = loadEnv('development', CWD);
// const PROD_ENV_CONFIG = loadEnv('production', CWD);

export default ({ command, mode }: ConfigEnv): UserConfig => {
    // 环境变量
    const { VITE_BASE_URL, VITE_API, VITE_PX_TO_VW } = loadEnv(mode, CWD)
    const isBuild = command === 'build'
    const isPXToViewport = VITE_PX_TO_VW === '1'
    console.log('当前执行环境：', isBuild, VITE_API)
    let plugins: any = [[], []]
    if (isPXToViewport) {
        plugins = [
            [
                pxToVwPlugin({
                    ...pxtoVwConfig
                })
            ],
            [
                classPxToVwPlugin({
                    ...pxtoVwConfig
                })
            ]
        ]
    }
    return {
        base: VITE_BASE_URL,
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: resolve(__dirname, './src')
                }
            ]
        },
        plugins: [
            vue(),
            createStyleImportPlugin({
                resolves: [
                    AndDesignVueResolve(), // 自动随引入加载对应的组件样式
                ],
                libs: [
                    // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
                    {
                        libraryName: 'ant-design-vue',
                        esModule: true,
                        resolveStyle: (name) => {
                            return `ant-design-vue/es/${name}/style/index`
                        },
                    },
                ],
            }),
            DefineOptions(),
            WindiCSS(),
            vueJsx({
                // options are passed on to @vue/babel-plugin-jsx
            }),
            legacy({
                targets: ['defaults', 'not IE 11']
            }),
            createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [resolve(CWD, 'src/assets/images')],
                // Specify symbolId format
                symbolId: 'icon-[dir]-[name]',

                /**
                 * custom insert position
                 * @default: body-last
                 * 'body-last'​：将生成的HTML代码插入到​<body>标签的末尾。
                 * ​​'body-first'​：将生成的HTML代码插入到​<body>标签的开头。
                 */
                inject: 'body-last',

                /**
                 * custom dom id
                 * @default: __svg__icons__dom__
                 */
                customDomId: '__svg__icons__dom__'
            }),

            Components({
                dirs: ['src/components', 'src/views'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
                // resolveIcons 配置是否对 antd 的图标起作用; importStyle 指是否需要自动随引入加载对应的组件样式； exclude除了xx组件
                resolvers: [AntDesignVueResolver({ importStyle: 'less', resolveIcons: false, exclude: [] })],
                // 允许子目录作为组件的命名空间前缀
                directoryAsNamespace: true, // 否则可能会有重名
                // 配置文件生成位置
                dts: 'types/components.d.ts',
                // 搜索子目录
                deep: true
            }),
            AutoImport({
                imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
                // 配置文件生成位置
                dts: 'types/auto-import.d.ts'
            }),
            createHtmlPlugin({
                minify: true,
                /**
                 * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
                 * @default src/main.ts
                 */
                entry: 'src/main.ts',
                /**
                 * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
                 * @default index.html
                 */
                template: 'index.html',
                inject: {
                    data: {
                        lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss')
                    },
                },
            }),
            ...plugins[0]
        ],
        css: {
            devSourcemap: true,
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        ...themeConfig
                    },
                    // modifyVars: getThemeVariables({
                    //     dark: true // 开启暗黑模式
                    // }),
                    javascriptEnabled: true,
                    charset: false
                }
            },
            postcss: {
                plugins: [...plugins[1]]
            }
        },
        server: {
            host: '0.0.0.0',
            port: 9010,
            proxy: {
                '/pcdp': {
                    target: 'http://10.10.10.63:12113', // 'http://10.10.10.193:12113', // 'https://hcs-fxyp-dpnew.scasst.net',
                    changeOrigin: true
                },
                '/pc': {
                    target: 'http://10.10.10.63:12108', // 'https://hcs-fxyp-dpnew.scasst.net', // 'http://10.10.10.63:12108',
                    changeOrigin: true
                },
                '/v2': {
                    target: 'http://10.10.10.63:12111', // 'http://10.10.10.63:12111',
                    changeOrigin: true
                }
            }
        },
        optimizeDeps: {
            // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包
            include: [],
            // 在预构建中强制排除的依赖项
            // Vue Demi是一个让你可以开发同时支持Vue2和3的通用的Vue库的开发工具，而无需担心用户安装的版本
            exclude: ['vue-demi']
        },
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    drop_debugger: true,
                    drop_console: true, // true清除console语句
                    pure_funcs: ['console.log'] // 屏蔽console.log
                }
            }
        }
    }
}
