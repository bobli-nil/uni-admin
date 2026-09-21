import { ref, render, h, defineComponent } from 'vue'
import FUpdatePassword from '@/components/common/f-update-password.vue'

export const showUpdatePwd = () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const visible = ref(true)

    return new Promise((resolve, reject) => {
        const destroy = () => {
            render(null, container)
            document.body.removeChild(container)
            resolve(visible.value)
        }

        const Wrapper = defineComponent({
            render: () =>
                h(FUpdatePassword, {
                    visible: visible.value,
                    'onUpdate:visible': (val: boolean) => {
                        visible.value = val

                        if (!val) {
                            setTimeout(destroy, 300)
                        }
                    },
                }),
        })

        render(h(Wrapper), container)
    })
}
