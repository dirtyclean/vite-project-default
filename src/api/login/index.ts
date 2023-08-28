import { request } from '@/utils/request'
export async function login(data: LoginAPI.LoginParams) {
    return await request<LoginAPI.LoginResult>({
        url: '/pcdp/login/v1/account',
        method: 'post',
        data
    })
}
export async function getUserInfo(data: { code: string }) {
    return await request<{
        token: string
        ssoToken: string
        orgName: string
        areaId: string
        userType: string
    }>({
        url: '/pcdp/login/v1/code',
        method: 'post',
        data
    })
}
export async function getClientVerifyInfo() {
    return await request<LoginAPI.GetClientVerifyInfoResult>({
        url: '/pcdp/login/v1/client',
        method: 'get'
    })
}
export default {
    login,
    getClientVerifyInfo,
    getUserInfo
}
