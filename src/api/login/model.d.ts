declare namespace LoginAPI {
    interface LoginParams {
        password: string
        username: string
    }
    interface LoginResult {
        roleName: string
        token: string
        username: string
        orgName: string
        areaId: string | number
        userType: string
    }
    interface GetClientVerifyInfoResult {
        redirectUrl: string
        loginUrl: string
        outUrl: string
    }
}
