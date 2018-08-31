import axios from 'axios'
import constant from '../constant'
import {message} from 'antd'

const defaultAxiosOptions = {
    baseURL: constant.URL,
    timeout: 3000
}

const _request = (params) => {
    return axios({
        ...defaultAxiosOptions,
        ...params
    }).then(res => {
        const {err,msg,data} = res.data
        if(err===0){
            return data
        }
        throw msg
    }).catch(err=>{
         message.error(String(err||'网络错误')) 
    })
}
export default (params) => {

    const type = typeof params
    if (type === "object" && type !== null) {
        return _request(params)
    }
}