import axios from 'axios'
import Router from '../router/index'
import {Notification, Message} from 'element-ui'
import {getStorageItem, setStorageItem} from '../util/storage-unit';

const service = axios.create({
    baseURL: '',
    timeout: 15000,
})

// 请求计数器
let requestNum = 0;
let notification = null;

service.interceptors.request.use(request => {
    const token = getStorageItem("Authorization");
    token && (request.headers.Authorization = token);
    requestNum++;
    return request;
}, error => {
    requestNum = 0;
    return Promise.reject(error);
});


service.interceptors.response.use(response => {
        requestNum--;
        storageToken(response);
        return response.data;
    },
    error => {
        if (notification && requestNum <= 0) {
            notification.closeAll();
        }
        let resp = error.response;
        errorHandle(resp);
        requestNum = 0;
        return Promise.reject(resp.data);
    });


function errorHandle(response) {
    let status = response.status;
    if (status === 500) {
        return;
    }
    notification = Notification.error({
        title: '错误（' + status + ')',
        message: '服务器出现错误，请稍后重试！',
        showClose: false
    });
    setInterval(() => {
        Message.closeAll();
    }, 10);
    Router.push('/error');
}

function storageToken(response) {
    if (response.config.url === '/api/login') {
        let token = response.headers.authorization;
        if (token) {
            setStorageItem("Authorization", token);
        }
    }
}

export default service;
