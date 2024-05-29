<template>
  <div class="layout">
<!--    <loading/>-->
    <el-row class="index-content">
      <el-col :xl="{span: 10, offset: 5}" :lg="{span: 13, offset: 3}" :md="{span: 14, offset: 2}"
              :xs="{span: 22, offset: 1}" :sm="{span: 22, offset: 1}" class="home_left_col">
        <article-list-tab @change-query-type="changeQueryType"/>
        <article-list :query-cate-id="queryCateId" :query-type="currentQueryType" :page-disabled="true"
                      ref="articleList"/>
      </el-col>
      <el-col :xl="4" :lg="5" :md="6" :xs="{span: 22, offset: 1}" :sm="{span: 22, offset: 1}" class="ml-lg-3 home_right_col">
        <cate-cloud/>
        <topic-side/>
        <friendship-link-side/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ArticleList from "../components/article/ArticleList";
import CateCloud from "../components/home/CateCloud";
import TopicSide from "../components/home/TopicSide";
import ArticleListTab from '../components/home/ArticleListTab';
import FriendshipLinkSide from '../components/home/FriendshipLinkSide';
import Loading from '@/components/common/Loading';

export default {
  name: "Home",
  data() {
    return {
      queryCateId: 0,
      currentQueryType: 1
    }
  },
  components: {
    ArticleList,
    CateCloud,
    TopicSide,
    ArticleListTab,
    FriendshipLinkSide,
    Loading
  },
  methods: {
    changeQueryType(value) {
      this.currentQueryType = value;
    }
  }
}
</script>

<style scoped>
.index-content {
  padding-top: 20px;
  padding-bottom: 20px;
}
.home_left_col {
  min-height: 70em;
}
.home_right_col {
  min-height: 70em;
}
</style>
