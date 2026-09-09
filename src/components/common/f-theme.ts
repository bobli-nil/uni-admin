import { ref } from 'vue'

export const theme = ref('light')

export function setTheme(val: string) {
    if (val === 'dark') {
        document.body.setAttribute('arco-theme', 'dark')
    } else {
        document.body.removeAttribute('arco-theme')
    }
    theme.value = val
    window.localStorage.setItem('theme', val)
}

export function loadTheme() {
    const theme = window.localStorage.getItem('theme')
    if (theme === 'dark') {
        setTheme('dark')
    }
}
