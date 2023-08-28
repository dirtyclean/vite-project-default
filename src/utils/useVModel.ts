import { computed, getCurrentInstance } from 'vue'

export const useVModel = (props, propName: string | number) => {
    const instance = getCurrentInstance()
    if (instance) {
        const vm: any = instance.proxy
        return computed({
            get() {
                return props[propName]
            },
            set(value) {
                vm.$emit(`update:${propName}`, value)
            }
        })
    }
}
