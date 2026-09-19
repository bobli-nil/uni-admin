import { ref, render, h, watch, defineComponent } from 'vue'
import FLoginModal from '@/components/web/f-login-modal.vue'

export const showLogin = () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const visible = ref(true)

    const destroy = () => {
        render(null, container)
        document.body.removeChild(container)
    }

    const Wrapper = defineComponent({
        render: () =>
            h(FLoginModal, {
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

    return {
        close: () => {
            visible.value = false
        },
    }
}
