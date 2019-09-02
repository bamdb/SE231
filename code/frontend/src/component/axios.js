import axios from 'axios';
import {message} from 'antd';

axios.defaults.timeout=10000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
    if(localStorage.getItem("access_token") != null && window.location.href.split('/')[3]!='search') {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access_token");
    }
    return config
})

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
}

// respone拦截器
axios.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            message.error(response.data.message)
        }
        else message.success("请求成功")
        return response
    },
    error => {
        console.log(error)

        if (error === undefined || error.code === 'ECONNABORTED') {
            message.warning('服务请求超时')
            return Promise.reject(error)
        }
        const { response: { status, statusText, data: { msg = '服务器发生错误' } }} = error
        const { response } = error
        const text = codeMessage[status] || statusText || msg
        if (status === 400) {
            message.warning('账户或密码错误！')
        }
        const info = response.data
        if (status === 401 || info.status === 40101) {
            message.error('你已被登出，可以取消继续留在该页面，或者重新登录')
            localStorage.clear();
            window.location.reload();
        }
        if (status === 403) {
            message.error(`${status}:${text}`)
        }
        if (info.status === 30101) {
            message.error(`${status}:${text}`)
            // dispatch(routerRedux.push('/exception/500'))
            // Notification.warning({
            //     title: '失败',
            //     message: info.message,
            //     type: 'error',
            //     duration: 2 * 1000,
            // })
        }
        else{
            message.error(`${status}:${text}`)
            // dispatch(routerRedux.push('/exception/500'))
            // Message({
            //     message: '后端服务异常，请联系管理员！',
            //     type: 'error',
            //     duration: 5 * 1000,
            // })
        }
        //message.error(`${status}:${text}`)
        // throw error
        // return error
        return Promise.reject(error)
    }
)