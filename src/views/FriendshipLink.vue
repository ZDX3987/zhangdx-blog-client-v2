<template>
  <el-row type="flex" justify="center" class="text-left">
    <el-col :lg="16" :md="20" :xs="22" :sm="22">
      <div class="friendship-link-content">
        <div class="link-header px-4">
          <span><i class="fa fa-server"></i>&nbsp;友链列表</span>
        </div>
        <el-row class="link-desc mx-4">
          <el-col :md="16" :sm="24" :xs="24">
            <div v-content="'content-placeholder-1'" class="desc-html"></div>
            <button class="add-link-btn mb-3" @click="openDialog">申请友链</button>
          </el-col>
        </el-row>
        <div class="link-list mt-3">
          <el-row v-loading="linkLoading">
            <el-col v-for="(link, i) of friendshipLinkList" :key="i" :xl="4" :lg="6" :md="6" :sm="8" :xs="12"
                    class="px-5 py-3">
              <a target="_blank" :href="link.linkUrl">{{ link.linkName }}</a>
            </el-col>
          </el-row>
        </div>
      </div>
      <friendship-link-dialog ref="friendshipLinkDialog"/>
    </el-col>
  </el-row>
</template>

<script>
import FriendshipLinkDialog from '../components/dialog/FriendshipLinkDialog';

export default {
  name: "FriendshipLink",
  data() {
    return {
      friendshipLinkList: [],
      linkLoading: false,
    }
  },
  components: {
    FriendshipLinkDialog
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      this.linkLoading = true;
      this.$api.friendshipLinkApi.getAllFriendshipLink().then(res => {
        this.friendshipLinkList = res.data;
        setInterval(() => this.linkLoading = false, 600);
      }).catch(error => this.$message.error(error.msg));
    },
    openDialog() {
      this.$refs.friendshipLinkDialog.open();
    }
  }
}
</script>

<style scoped>
.friendship-link-content {
  background-color: var(--bgColor);
  min-height: 68vh;
}

.link-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid var(--borderColor);
  display: flex;
  justify-content: space-between;
  color: var(--fontColor);
}

.link-desc {

  border-bottom: 1px solid var(--borderColor);
}

.add-link-btn {
  height: 40px;
  width: 100px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid var(--mainThemeColor);
  border-radius: 3px;
  color: var(--mainThemeColor);
  transition: all 0.5s;
}

.add-link-btn:hover {
  background-color: var(--mainThemeColor);
  color: #FFF;
}

.link-list a {
  color: var(--subFontColor);
  font-size: 15px;
  text-decoration: none;
  transition: all 0.5s;
}

.link-list a:hover {
  color: var(--mainThemeColor);
}
</style>