import { request } from '@/utils/request'

// 获取数据字典
export async function getDictionaryList(params: API.GetDictionaryListParams) {
    return await request<API.GetDictionaryListResult>({
        url: '/pc/dic/v1/dics',
        method: 'get',
        params
    }).then(data => {
        return data.map(({ sjmc, id }) => ({
            label: sjmc,
            value: id
        }))
    })
}
export default {
    getDictionaryList
}
