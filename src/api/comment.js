import http from '../http/index'

const url = '/api/client/comment';

export default {
    saveComment(itemId, content, commentType, fromUser) {
        let params = {
            itemId,
            content,
            commentType,
            fromUser
        }
        return http.post(url, params);
    },
    saveReply(commentId, replyId, content, replyType, fromUser, toUser) {
        let params = {
            commentId,
            replyId,
            content,
            replyType,
            fromUser,
            toUser
        }
        return http.post(url + '/reply', params);
    },
    getCommentListForItem(itemId, commentType) {
        let params = {
            itemId,
            commentType,
        }
        return http.get(url, {params: params});
    }

}