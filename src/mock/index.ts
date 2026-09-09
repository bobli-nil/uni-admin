import { userMock } from '@/mock/user-mock.ts'

export const apiMock = () => {
    const env = import.meta.env
    if (env.VITE_MOCK === 'true') {
        userMock()
    }
}