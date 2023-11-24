import axios from 'axios';
import { errorCodeType } from './error';
// import { ElMessage, ElLoading } from 'element-plus';
import { getToken, removeToken } from "./auth";
import { ElLoading, ElMessage } from 'element-plus';

// 创建axios实例
const service = axios.create({
  // 服务接口请求
  baseURL: import.meta.env.VITE_APP_DEV_URL,
  // 超时设置
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

let loading: any;
//正在请求的数量
let requestCount: number = 0
//显示loading
const showLoading = () => {
  if (requestCount === 0 && !loading) {
    //加载中显示样式可以自行修改
    loading = ElLoading.service({
      text: "拼命加载中，请稍后...",
      background: 'rgba(0, 0, 0, 0.7)',
      // spinner: 'el-icon-loading',
    })
  }
  requestCount++;
}
//隐藏loading
const hideLoading = () => {
  requestCount--
  if (requestCount == 0) {
    loading.close()
  }
}

// let lastTime = new Date().getTime()
// 请求拦截
service.interceptors.request.use(config => {
  // console.log(requestCount);
  // showLoading()
  // 是否需要设置 token放在请求头
  const isToken = (config.headers || {}).isToken === false;
  if (getToken() && !isToken) {
    config.headers["Authorization"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  // 节流处理
  // const nowTime = new Date().getTime()
  // console.log(nowTime - lastTime);
  // if (nowTime - lastTime < 1500) {
  //   return Promise.reject(new Error('请勿重复请求，稍后再试'))
  // }else{
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof (value) !== "undefined") {
        // 对象处理
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  // }
  // lastTime = nowTime
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((res) => {
  // hideLoading()
  // 未设置状态码则默认成功状态
  // const code = res.data['code'] || 200;
  const code = res['status'] || 200;
  // 获取错误信息
  const msg = errorCodeType(code) || res.data['msg'] || errorCodeType('default')
  if (code === 200) {
    return Promise.resolve(res.data)
  } else {
    ElMessage.error(msg)
    return Promise.reject(res.data)
  }
},
  error => {
    console.log('err' + error)
    // hideLoading()
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage.error({
      message: message,
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service;