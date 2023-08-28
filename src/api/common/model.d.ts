declare namespace API {
    interface GetDictionaryListParams {
        sslx: number // 2行业类别
    }

    interface GetDictionaryListResultItem {
        sjmc: string
        id: string
    }
    type GetDictionaryListResult = GetDictionaryListResultItem[]
}
