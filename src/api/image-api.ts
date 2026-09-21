import { type baseResponse, useAxios } from '@/api/index'

export const imageUploadApi = (file: File): Promise<baseResponse<string>> => {
    const formData = new FormData()
    formData.append('file', file)
    return useAxios.post('/api/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
