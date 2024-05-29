<template>
  <div class="friendship-link-content">
    <div class="friendship-link-header">
      <span><i class="fa fa-server"></i>&nbsp;友链列表</span>
      <router-link :to="{name: 'FriendshipLink'}">
        <el-link :underline="false">更多&gt;</el-link>
      </router-link>
    </div>
    <div class="friendship-link-body py-3">
      <ul class="other-links pl-2" v-if="friendshipLinkList.length !== 0">
        <li v-for="(link, i) of friendshipLinkList" :key="i" class="m-3 d-inline-block">
          <a target="_blank" :style="{color: randomColor()}" :href="link.linkUrl">{{ link.linkName }}</a>
        </li>
      </ul>
      <empty-list v-else :empty-size="8"/>
    </div>
  </div>
</template>

<script>
import {randomColor} from '../../util/common-utils';
import EmptyList from '@/components/common/EmptyList.vue';

export default {
  name: "FriendshipLinkSide",
  components: {EmptyList},
  data() {
    return {
      friendshipLinkList: []
    }
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      this.$api.friendshipLinkApi.getAllFriendshipLink().then(res => {
        this.friendshipLinkList = res.data;
      }).catch(error => this.$message.error(error.msg));
    },
    randomColor() {
      return randomColor();
    }
  }
}
</script>

<style scoped>
.friendship-link-content {
  background-color: var(--bgColor);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

.friendship-link-header {
  height: 50px;
  border-bottom: 1px solid var(--borderColor);
  font-size: 18px;
  line-height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  color: var(--fontColor);
}

.friendship-link-header a {
  text-decoration: none;
}

.friendship-link-body {
  text-align: left;
  font-size: 15px;
  color: var(--fontColor);
}

.other-links {
  list-style: none;

}

.other-links li {
  font-size: 16px;
}

.other-links a {
  text-decoration: none;
  transition: all 0.5s;
}

.other-links li a:hover {
  color: var(--mainThemeColor) !important;
}
</style>