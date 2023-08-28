const pxtoVwConfig = {
    // options
    unitToConvert: 'px', // 需要转换的单位，默认为"px"
    viewportWidth: 1920, // 设计稿宽度  px / (1920 / 100) + 'vw'
    unitPrecision: 5, // px转换后的小数保留位数，有时候不能整除
    minPixelValue: 1, // 小于或等于`1px`时不转换为视窗单位
    selectorBlackList: [], // 不进行转换的css选择器，继续使用原有单位
    exclude: [], // 忽略某些文件夹下的文件
    viewportUnit: 'vw', // 希望使用的视口单位
    fontViewportUnit: 'vw' // 字体使用的视口单位
}
const plugins = [
    // require('postcss-windicss')({
    //     transformCSS: 'rem'
    // })
    // 其他的 PostCSS 插件
]
module.exports = {
    plugins,
    pxtoVwConfig
}
