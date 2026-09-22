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

export const onUploadImg = async (files: File[], callback: (urls: string[]) => void) => {
    const resList = await Promise.all(files.map((file) => imageUploadApi(file)))
    const urlList = resList.map((res) => res.data)
    console.log('urlList', urlList)
    callback(urlList)
}
