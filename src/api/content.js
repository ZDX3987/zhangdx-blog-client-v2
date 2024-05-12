import http from '../http';

let url = '/api/client/content';

export default {
    getContentByRouter(route, value) {
        let params = {
            route: route,
            documentId: value
        };
        return http.get(url + '/list-by-router', {params: params});
    },
}