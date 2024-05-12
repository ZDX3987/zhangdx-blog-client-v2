import http from '../http/index'

const url = '/api/my-collection';

export default {

  getMyCollectionList() {
    return http.get(url + '/list');
  },

  editCollection(form) {
    return http.post(url + "/collection", form);
  },

  deleteCollection(id) {
    return http.delete(url + "/" + id);
  },

  doCollect(itemId, collectionId, itemType, isCollect) {
    let form = {
      itemId,
      collectionId,
      itemType,
      isCollect
    }
    return http.post(url + "/collect", form);
  }

}
