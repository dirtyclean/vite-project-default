/*
 * @Author: dirtyclean
 * @Date: 2023-06-21 10:21:01
 * @Last Modified by: dirtyclean
 * @Last Modified time: 2023-06-21 16:07:06
 * 目前仅实现了内嵌style的px替换
 * 为什么不把template中的px全部替换？因为windicss的class名，如果携带单位px的话，也会进行替换
 * 将此和postcss-px-to-viewport连用，可实现内嵌style的单位转换以及外联class的单位转换
 */
interface IdefaultsProp {
    unitToConvert: string
    viewportWidth: number
    unitPrecision: number
    viewportUnit: string
    fontViewportUnit: string
    minPixelValue: number
}

// 默认参数
const defaultsProp = {
    unitToConvert: 'px', // 需要转换的单位，默认为"px"
    viewportWidth: 750, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
    unitPrecision: 5, // 单位转换后保留的精度
    viewportUnit: 'vw', // 希望使用的视口单位
    fontViewportUnit: 'vw', // 字体使用的视口单位
    minPixelValue: 1 // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
}
function toFixed(number: number, precision: number): number {
    const multiplier = Math.pow(10, precision + 1)
    const wholeNumber = Math.floor(number * multiplier)
    return (Math.round(wholeNumber / 10) * 10) / multiplier
}

function createPxReplace(
    viewportSize: number,
    minPixelValue: number,
    unitPrecision: number,
    viewportUnit: string
): (str: string, value: string) => string | undefined {
    return function ($0: string, $1: string): string | undefined {
        if (!$1) return
        const pixels = parseFloat($1)
        if (pixels <= minPixelValue) return
        return `${toFixed((pixels / viewportSize) * 100, unitPrecision)}${viewportUnit}`
    }
}
const templateReg = /<template>([\s\S]+)<\/template>/gi
const styleReg = /style="([^"]*)"/gi
const pxGlobalReg = /(\d+)px/gi
function pxToVwPlugin(customOptions: IdefaultsProp = defaultsProp) {
    customOptions = Object.assign({}, customOptions, defaultsProp)
    return {
        // 插件名称
        name: 'px-to-vw',
        enforce: 'pre',
        // 构建阶段的通用钩子：在每个传入模块请求时被调用：在每个传入模块请求时被调用，主要是用来转换单个模块
        transform(code, id) {
            if (/.vue$/.test(id)) {
                let source = ''
                if (templateReg.test(code)) {
                    source = code.match(templateReg)[0]
                }
                if (styleReg.test(source)) {
                    const replaceSource = source.replace(styleReg, (match, style) => {
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        return `style="${style.replace(
                            pxGlobalReg,
                            createPxReplace(
                                customOptions.viewportWidth,
                                customOptions.minPixelValue,
                                customOptions.unitPrecision,
                                customOptions.viewportUnit
                            )
                        )}"`
                    })
                    code = code.replace(source, replaceSource)
                }
            }
            return code
        }
    }
}
export default pxToVwPlugin
