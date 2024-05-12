import http from '../http';

let url = '/api/client/blog_like';

export default {
    like(itemId, operatorId, likeType) {
        let params = {
            itemId,
            operatorId,
            likeType
        };
        return http.post(url, params);
    },
    unLike(itemId, operatorId, likeType) {
        let params = {
            itemId,
            operatorId,
            likeType
        };
        return http.post(url + '/del', params);
    },
}