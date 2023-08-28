import axios, { AxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN_KEY, TOKEN_PREFIX, SSO_TOKEN_KEY } from '@/enums/cacheEnum'
import { Storage } from '@/utils/storage'
import { message as Toast } from 'ant-design-vue'
import { toLoginVerify } from '@/router/index'
export interface RequestOptions {
    /** 是否直接获取data，而忽略message等 */
    isGetDataDirectly?: boolean
    /** 请求成功是提示信息 */
    successMsg?: string
    /** 请求失败是提示信息 */
    errorMsg?: string
}
const showErrorMessage = true
const UNKNOWN_ERROR = '未知错误，请重试'

/** 真实请求的路径前缀 */
const baseApiUrl = import.meta.env.VITE_BASE_API
const service = axios.create({
    baseURL: baseApiUrl,
    timeout: 60 * 1000
})
service.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
service.interceptors.request.use(
    config => {
        const token: string = Storage.get(ACCESS_TOKEN_KEY)
        const ssoToken: string = Storage.get(SSO_TOKEN_KEY)
        if (token && config.headers) {
            // 请求头token信息，请根据实际情况进行修改
            config.headers.Authorization = TOKEN_PREFIX + token
        }
        if (ssoToken && config.headers) {
            config.headers.SSOToken = ssoToken
        }
        return config
    },
    async error => {
        return await Promise.reject(error)
    }
)

service.interceptors.response.use(
    async response => {
        const res: any = response.data
        // if the custom code is not 200, it is judged as an error.
        if (res.code !== 200 && res.code !== '200') {
            showErrorMessage && (Toast.error(res.message || UNKNOWN_ERROR) as any)
            // Illegal token
            if (res.code === 11001 || res.code === 11002) {
                await toLoginVerify()
            }
            if (~~res.code === 401) {
                await toLoginVerify()
                return
            }
            // throw other
            const error = new Error(res.message || UNKNOWN_ERROR) as Error & { code: any }
            error.code = res.code
            return await Promise.reject(error)
        } else {
            return res
        }
    },
    async error => {
        // 处理 422 或者 500 的错误异常提示
        const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR
        showErrorMessage && (Toast.error(errMsg) as any)
        error.message = errMsg
        if (~~error?.response?.data?.code === 401) {
            await toLoginVerify()
            return
        }
        return await Promise.reject(error)
    }
)

export interface Response<T = any> {
    code: number
    message: string
    data: T
}

export type BaseResponse<T = any> = Promise<Response<T>>

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = async <T = any>(config: AxiosRequestConfig, options: RequestOptions = {}): Promise<T> => {
    try {
        const { successMsg, errorMsg, isGetDataDirectly = true } = options
        const res = await service.request(config)
        successMsg && console.log(successMsg)
        showErrorMessage && errorMsg && Toast.error(errorMsg)
        return isGetDataDirectly ? res.data : res
    } catch (error: any) {
        return await Promise.reject(error)
    }
}
