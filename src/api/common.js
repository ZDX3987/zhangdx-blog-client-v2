import http from '../http/index'

const url = '/api/client';

export default {
    getWebsiteInfo() {
        return http.get(url + '/website/info');
    },

    getMenuList() {
        return http.get(url + '/menu/list');
    }
    
}