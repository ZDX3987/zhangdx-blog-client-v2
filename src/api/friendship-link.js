import http from '../http/index'

const url = '/api/client/friendship-link';

export default {

  getAllFriendshipLink() {
    return http.get(url + '/friendship-links');
  },
  saveLink(linkForm) {
    return http.post(url, linkForm, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }
}
