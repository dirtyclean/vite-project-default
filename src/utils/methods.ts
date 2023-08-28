// _parID 父节点标识.标识它是父节点的值(数据是乱的,给出pid的值找不到对应id,则传空)
export const getTreeData = (
    data: any[],
    idKey = 'id',
    parentIdKey = 'parentId',
    childrenKey = 'children',
    _parID?: any
): any[] => {
    if (!data || data.length === 0) {
        return []
    }
    if (_parID === undefined || _parID === null || _parID === '') {
        // 找根数据（根节点的pid未知）
        const disParentCode: any[] = []
        // 遍历出所有的上级ID
        for (const item of data) {
            const parID = item[parentIdKey]
            if (disParentCode.includes(parID)) {
                continue
            }
            disParentCode.push(parID)
        }
        // 遍历出所有的ID
        const disCode: any[] = []
        for (const item of data) {
            const funID = item[idKey]
            disCode.push(funID)
        }
        const notExisted: any[] = []
        for (const item of disParentCode) {
            if (!disCode.includes(item)) {
                notExisted.push(item)
            }
        }
        const resultList: any[] = []
        for (const item of data) {
            const parID = item[parentIdKey]
            if (notExisted.includes(parID)) {
                resultList.push(item)
            }
        }
        // 查找下级
        for (const item of resultList) {
            const funID = item[idKey]
            const temp = getTreeData(data, idKey, parentIdKey, childrenKey, funID)
            if (temp.length > 0) {
                item[childrenKey] = temp
            }
        }
        return resultList
    } else {
        // 根节点的pid已知
        const resultList: any[] = []
        for (const item of data) {
            const parID = item[parentIdKey]
            if (parID !== null && parID === _parID) {
                resultList.push(item)
            }
        }
        // 查找下级
        for (const item of resultList) {
            const funID = item[idKey]
            const temp = getTreeData(data, idKey, parentIdKey, childrenKey, funID)
            if (temp.length > 0) {
                item[childrenKey] = temp
            }
        }
        return resultList
    }
}
export const deleteOptionsEmptyChildren = (options: any[]) => {
    options.forEach(option => {
        if (option.children?.length) {
            deleteOptionsEmptyChildren(option.children)
        } else {
            delete option.children
        }
    })
    return options
}
export const getSelectedIds = (
    data: any[],
    id: String,
    parentKey = 'parentId',
    key = 'id',
    childrenKey = 'children'
) => {
    // rootPId作用：根节点的pId设置为了一个值，但是找不到对应的以pId的值为id的节点， 也就是说根节点的pId是无效的，不能被push进来(过滤脏数据)
    // 找到第一级的pId(rootPId)
    const rootPIds = data.map(item => item[parentKey])
    const selResult: any[] = []
    function findSel(data: any[], id: String) {
        let isFind = false
        for (const i of data) {
            if (isFind) {
                break
            }
            if (i[key] !== id) {
                if (undefined !== i[childrenKey] && i[childrenKey] !== null) {
                    if (i[parentKey] && !rootPIds.includes(i[parentKey])) {
                        selResult.push(i[parentKey])
                    }
                    isFind = findSel(i[childrenKey], id)
                }
            } else {
                if (i[parentKey] && !rootPIds.includes(i[parentKey])) {
                    selResult.push(i[parentKey])
                }
                selResult.push(id)
                isFind = true
            }
        }
        if (!isFind) {
            selResult.pop()
        }
        return isFind
    }
    findSel(data, id)
    return selResult
}
export const setParentKey = (treeData: any[], idKey = 'id', pIdKey = 'parentId') => {
    const findData = (list: any[], pId?: String) => {
        list.forEach(item => {
            item[pIdKey] = item[pIdKey] || pId
            if (item.children?.length) {
                findData(item.children, item[idKey])
            }
        })
    }
    findData(treeData)
    return treeData
}
export const generateList = (data, idKey = 'id', titleKey = 'name', childrenKey = 'children') => {
    const dataList = []
    function findData(options) {
        for (let i = 0; i < options.length; i++) {
            const node = options[i]
            const key = node[idKey]
            const item = { ...node }
            delete item[childrenKey]
            const params = { key, title: options[i][titleKey], ...item }
            dataList.push(params as never)
            if (node[childrenKey]) {
                findData(node[childrenKey])
            }
        }
    }
    findData(data)
    return dataList
}
export const cloneDeep = (obj, cache = []) => {
    function find(list, f) {
        return list.filter(f)[0]
    }
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }
    const copy = Array.isArray(obj) ? [] : {}
    const params = {
        original: obj,
        copy
    }
    cache.push(params as never)
    Object.keys(obj).forEach(key => {
        copy[key] = cloneDeep(obj[key], cache)
    })
    return copy
}
export const getEqual1Data = (
    data: Array<{ name: string; value: string | number; [key: string]: any }>,
    sumValue: number,
    number: number
) => {
    // 从小到大排列 四舍五入, 多一个就多一个
    data = cloneDeep(data)
    data = data.map(item => {
        const { name, value } = item
        return Object.assign(item, {
            name,
            value,
            fraction: (number * ~~value) / sumValue,
            formatFraction: Number.parseInt(((number * ~~value) / sumValue).toFixed(0))
        })
    })
    const resultData: Array<{ name: string; value: string | number; [key: string]: any }> = []
    data.forEach(item => {
        const { name, formatFraction } = item
        for (let i = 0; i < formatFraction; i++) {
            resultData.push({
                ...Object.assign(item, {
                    name,
                    value: 1
                })
            })
        }
    })
    console.log(resultData)
    return resultData as any
}
export const getItemById = (data, id, idKey = 'id') => {
    let result
    function findSel(treeData) {
        treeData.forEach(el => {
            if (!result) {
                if (id === el[idKey]) {
                    result = el
                }
                if (el.children?.length) {
                    findSel(el.children)
                }
            }
        })
    }
    findSel(data)
    return result
}
export const getParentItemByChildId = (data, childId, idKey = 'id', pIdKey = 'parentId') => {
    return getItemById(data, getItemById(data, childId, idKey)?.[pIdKey], idKey)
}
export const camelCase = function (name) {
    return name.replace(/([:\-_]+(.))/g, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter
    })
}
export const isCounty = (areaCode: string | number) => {
    if (!areaCode) return false
    areaCode = (areaCode.toString() + '000000').slice(0, 12)
    if (areaCode.slice(-6) === '000000' && areaCode.slice(-8, -6) !== '00') {
        return true
    }
    return false
}
export const isCity = (areaCode: string | number) => {
    if (!areaCode) return false
    areaCode = (areaCode.toString() + '000000').slice(0, 12)
    return areaCode.slice(-8) === '00000000' && areaCode.slice(-10, -8) !== '00'
}
export const isProvince = (areaCode: string | number) => {
    if (!areaCode) return false
    areaCode = (areaCode.toString() + '000000').slice(0, 12)
    return areaCode.slice(-10) === '0000000000'
}
// 去重
export const getUniqueData = (data, uniqueKey) => {
    const obj = {}
    // 根据uniqueKey重复去重
    return data.reduce((cur, next) => {
        // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
        obj[next[uniqueKey]] ? '' : (obj[next[uniqueKey]] = true && cur.push(next))
        return cur
    }, [])
}
export const getMaxZIndex = (elements?) => {
    elements = elements || document.getElementsByTagName('*')
    return [...elements].reduce((r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0), 0)
}
export const toFixed = (number: number, precision: number) => {
    const multiplier = Math.pow(10, precision + 1)
    const wholeNumber = Math.floor(number * multiplier)
    return (Math.round(wholeNumber / 10) * 10) / multiplier
}
