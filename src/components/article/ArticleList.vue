<template>
  <div class="list-content">
    <ul v-if="!isEmpty" class="article-ul">
      <li v-for="(article, index) of articleList" :key="index">
        <article-list-item :article="article"/>
      </li>
      <ul class="article-ul" v-if="isLoading">
        <li v-for="i of emptyListLength" :key="i">
          <article-list-skeleton/>
        </li>
      </ul>
      <li v-if="pageDisabled">
        <div class="load-more">
          <a v-if="!listEnd" @click="loadMoreArticle">点击加载更多</a>
          <p v-if="listEnd">已经到底了...</p>
        </div>
      </li>
      <li v-else>
        <page-list :total="total" :current-page="pageIndex" :page-size="pageSize"
                   @current-change="queryArticle"/>
      </li>
    </ul>
    <empty-list v-else/>
  </div>
</template>

<script>
import ArticleListSkeleton from '../skeleton/ArticleListSkeleton';
import ArticleListItem from './ArticleListItem';
import EmptyList from '../common/EmptyList';
import PageList from '../common/PageList';

export default {
  name: "ArticleList",
  data() {
    return {
      articleList: [],
      sort: 2,
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      isLoading: true,
      listEnd: false,
      emptyListLength: 1,
      isEmpty: false
    };
  },
  components: {
    ArticleListSkeleton,
    ArticleListItem,
    EmptyList,
    PageList
  },
  props: {
    queryCateIds: [],
    queryType: {type: Number, default: 1},
    pageDisabled: false
  },
  watch: {
    queryCateIds(value) {
      this.queryArticle(1);
    },
    queryType(value) {
      this.queryArticle(1);
    }
  },
  created() {
    this.queryArticle(1);
  },
  methods: {
    loadMoreArticle() {
      this.queryArticle(++this.pageIndex);
    },
    queryArticle(pageIndex) {
      this.isLoading = true;
      this.pageIndex = pageIndex
      if (pageIndex === 1 || !this.pageDisabled) {
        this.articleList = [];
      }
      this.$api.articleApi
          .getArticleByPage(this.pageSize, pageIndex, this.sort, this.queryCateIds, this.queryType)
          .then((res) => {
            if (res.data.total === 0) {
              this.isEmpty = true;
              return;
            }
            if (this.pageDisabled) {
              this.articleList = this.articleList.concat(res.data.records);
              if (res.data.total === this.articleList.length) {
                this.listEnd = true;
              }
            } else {
              this.articleList = res.data.records;
            }
            this.total = res.data.total
          })
          .catch((error) => this.$message.error("文章获取失败，请稍后重试"))
          .finally(() => {
            this.isLoading = false;
          });
    },
  },
};
</script>

<style scoped>
.list-content {
  width: 100%;
  background-color: var(--bgColor);
  padding: 2rem;
  min-height: 76em;
}

.article-ul {
  list-style: none;
  width: 100%;
  padding: 0;
}

.article-ul li {
  padding: 20px 20px;
  border-bottom: 1px solid var(--borderColor);
}

.load-more a {
  text-decoration: none;
  cursor: pointer;
}

.load-more a, p {
  color: var(--aBg);
}
</style>
