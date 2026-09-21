import { ref, render, h, defineComponent } from 'vue'
import FUpdateEmail from '@/components/common/f-update-email.vue'

export const showUpdateEmail = () => {
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
                h(FUpdateEmail, {
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
