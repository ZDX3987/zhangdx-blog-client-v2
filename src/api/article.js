import http from '../http/index'

const url = '/api/client/article';

export default {
  getArticleByPage(pageSize, pageIndex, sort, queryCateIds, queryType = 1) {
    let formData = {
      pageSize: pageSize,
      pageIndex: pageIndex,
      sortType: sort,
      cateIds: queryCateIds ? queryCateIds.join(',') : null,
      queryType: queryType,
      status: [],
      authorId: null
    };
    return http.get(url + '/articles', {params: formData});
  },
  getArticleById(id) {
    return http.get(url + '/article/' + id);
  },

  getArchivesTimeline() {
    return http.get(url + '/archives/timeline');
  },

  getArticleForArchives(formData) {
    return http.get(url + '/archives/articles', {params: formData})
  },

  praiseArticle(type, articleId) {
    return http.put(url + '/article/praise/' + articleId, {type: type})
  },

  getPrevAndNextArticle(articleId) {
    return http.get(url + '/prev-next-article/' + articleId);
  },

  getRelatedArticles(articleId) {
    return http.get(url + '/related-articles/' + articleId);
  }

}
