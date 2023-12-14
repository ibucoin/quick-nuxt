import {baseURL} from "nuxt/dist/core/runtime/nitro/paths";

interface ResOptions<T> {
    data:T,
    code?:number,
    message?:string
}

const fetch = async (url:string, options?:any,headers?:any) => {
    const token = 'Bearer ' + localStorage.getItem('token')
    const customHeaders = {Authorization: token, accept: 'application/json',contentType: 'application/json', ...headers}
    const baseUrl = useRuntimeConfig().public.baseURL
    const reqUrl = baseUrl + url
    try {
        const { data, error ,status} =
            await useFetch(reqUrl, { ...options, headers: customHeaders,watch: false})
        console.log(444)
        const result = data.value as ResOptions<any>

        if (!error.value || !result || (result && result.code !== 200)) {
            if (error.value) {
                const  res = error.value.data
                showToast(res.message)
                return Promise.reject(error)
            }
        }
        return Promise.resolve(result)
    }catch (err)
    {
        return Promise.reject(err)
    }
}

class Http {
    get(url: string, params?: any, headers?: any) {
        return fetch(url, { method: 'get', params }, headers)
    }
    post(url: string, body?: any, headers?: any) {
        return fetch(url, { method: 'post', body }, headers)
    }
    put(url: string, body?: any, headers?: any) {
        return fetch(url, { method: 'put', body }, headers)
    }

    delete(url: string, body?: any, headers?: any) {
        return fetch(url, { method: 'delete', body }, headers)
    }
}
export default function(){
    return new Http()
}