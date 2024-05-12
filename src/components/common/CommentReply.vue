<template>
  <div class="comment-content">
    <div class="comment-content-header">
      <span><i class="fa fa-commenting"></i>&nbsp;发表评论</span>
    </div>
    <div class="comment-content-body px-5 py-2">
      <div class="d-flex">
        <div class="d-inline-block mr-3">
          <el-avatar icon="el-icon-user-solid" :src="currentSysUserInfo.avatar"/>
        </div>
        <div class="d-inline-block w-100">
          <div>
            <textarea class="comment-input" placeholder="发表你的看法" rows="3" v-model="currentCommentContent"
                      @focus="checkForComment"></textarea>
          </div>
          <div>
<!--            <a class="fa fa-smile-o comment-emoji-btn d-inline-block" title="添加表情">&nbsp;表情</a>-->
            <el-button type="success" class="d-inline-block float-right" @click="saveComment"
                       :disabled="!currentCommentContent">发表评论
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-list px-5 py-2" v-if="commentList.length > 0" v-loading="loading">
      <h5 class="mt-3 comment-list-title">全部评论 {{ commentList.length }}</h5>
      <div class="comment-item d-flex my-3" v-for="commentItem in commentList" :key="commentItem.id">
        <div class="d-inline-block mr-3">
          <el-avatar icon="el-icon-user-solid"
                     :src="commentItem.fromUser.avatar"/>
        </div>
        <div class="d-inline-block w-100">
          <div>
            <span class="comment-user-name">{{ commentItem.fromUser.nickname }}</span>
            <span class="float-right comment-date">{{ fromNow(commentItem.createDateTime) }}</span>
          </div>
          <div class="comment-text my-2">
            {{ commentItem.content }}
          </div>
          <div>
            <el-link :underline="false" class="mr-2"><i class="iconfont iconzan" aria-hidden="true"/>&nbsp;点赞</el-link>
            <el-link :underline="false" @click.stop="openReply('comment_' + commentItem.id)">
              <i class="iconfont iconpinglun" aria-hidden="true"/>&nbsp;
              {{ currentReplyId === 'comment_' + commentItem.id ? '取消' : '' }}回复
            </el-link>
          </div>
          <reply-input v-if="currentReplyId === 'comment_' + commentItem.id" @reply-blur="replyBlur"
                       @save-reply="saveReply($event, commentItem.id, commentItem.id, 1, currentSysUserInfo.id, commentItem.fromUser.id)"/>
          <div class="comment-reply-list p-3 my-3" v-if="commentItem.replyList.length > 0">
            <div class="comment-reply-item d-flex my-2" v-for="(replyItem, index) in commentItem.replyList"
                 :key="replyItem.id" v-if="index < maxShowReplyNum">
              <div class="d-inline-block mr-3">
                <el-avatar class="comment-reply-avatar" icon="el-icon-user-solid"
                           :src="replyItem.fromUser.avatar"/>
              </div>
              <div class="d-inline-block w-100">
                <div>
                  <span class="comment-user-name">{{ replyItem.fromUser.nickname }}</span>
                  <span class="comment-user-name"
                        v-if="replyItem.replyType === 2">{{ '回复&nbsp;' + replyItem.toUser.nickname }}</span>
                  <span class="float-right comment-date">{{ fromNow(replyItem.createDateTime) }}</span>
                </div>
                <div class="comment-text my-2">
                  {{ replyItem.content }}
                </div>

                <div>
                  <el-link :underline="false" class="mr-2"><i class="iconfont iconzan" aria-hidden="true"/>&nbsp;点赞
                  </el-link>
                  <el-link :underline="false" @click.stop="openReply('reply_' + replyItem.id)">
                    <i class="iconfont iconpinglun"
                       aria-hidden="true"/>&nbsp;{{ currentReplyId === 'reply_' + replyItem.id ? '取消' : '' }}回复
                  </el-link>
                </div>
                <reply-input ref="replyInput" v-if="currentReplyId === 'reply_' + replyItem.id" @reply-blur="replyBlur"
                             @save-reply="saveReply($event, commentItem.id, replyItem.id, 2, currentSysUserInfo.id, replyItem.fromUser.id)"/>
              </div>
            </div>
            <el-link v-if="commentItem.replyList && commentItem.replyList.length > maxShowReplyNum" :underline="false"
                     class="ml-5 mt-2">查看更多回复<span class="el-icon-arrow-down"></span></el-link>
          </div>
        </div>
      </div>
      <div class="comment-load-btn ml-5 mt-2">加载全部评论&nbsp;<span class="el-icon-arrow-down"></span></div>
    </div>
  </div>
</template>

<script>

import {getAuthorization} from '../../util/storage-unit';
import ReplyInput from './ReplyInput';
import {fromNow} from '../../util/data-format';

export default {
  name: "CommentReply",
  data() {
    return {
      commentList: [],
      currentCommentContent: '',
      currentReplyId: '',
      loading: false,
      maxShowReplyNum: 2
    }
  },
  components: {
    ReplyInput
  },
  props: {
    itemId: null,
    commentType: null,
  },
  created() {
    this.loadComment();
  },
  computed: {
    currentSysUserInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    checkForComment() {
      if (!getAuthorization()) {
        this.$store.commit('showLoginDialog', true);
      }
    },
    openReply(replyId) {
      if (!getAuthorization()) {
        this.$store.commit('showLoginDialog', true);
        return;
      }
      if (this.currentReplyId === replyId) {
        this.currentReplyId = '';
        return;
      }
      this.currentReplyId = replyId;
    },
    loadComment() {
      this.loading = true;
      let itemId = this.itemId;
      let commentType = this.commentType;
      this.$api.commentApi.getCommentListForItem(itemId, commentType).then(res => {
        this.commentList = res.data;
      }).catch(error => this.$message.error('评论加载失败')).finally(() => this.loading = false);

    },
    saveComment() {
      if (!getAuthorization()) {
        return;
      }
      let itemId = this.itemId;
      let sysUserId = this.$store.state.userInfo.id;
      let commentType = this.commentType;
      this.$api.commentApi.saveComment(itemId, this.currentCommentContent, commentType, sysUserId).then(res => {
        this.loadComment();
        this.currentCommentContent = '';
      }).catch(error => this.$message.error('评论保存失败'));
    },
    saveReply(replyContent, commentId, replyId, replyType, fromUser, toUser) {
      if (!getAuthorization()) {
        return;
      }
      this.$api.commentApi.saveReply(commentId, replyId, replyContent, replyType, fromUser, toUser).then(res => {
        this.loadComment();
        this.currentCommentContent = '';
      }).catch(error => this.$message.error('评论保存失败'));
    },
    replyBlur($event) {
      this.currentReplyId = $event;
    },
    fromNow(date) {
      return fromNow(date);
    }
  }
}
</script>

<style scoped>
.comment-content {
  margin-top: 20px;
  background-color: var(--bgColor);
  text-align: left;
}

.comment-content-header {
  height: 50px;
  border-bottom: 1px solid var(--borderColor);
  font-size: 18px;
  line-height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  color: var(--fontColor);
}

.comment-input {
  width: 100%;
  max-height: 100px;
  resize: none;
  background-color: var(--bodyBgColor);
  transition: all 0.5s;
  font-size: 14px;
  padding-left: 10px;
  padding-top: 5px;
  border: 1px solid var(--bodyBgColor);
  border-radius: 4px;
}

.comment-input:focus,
.comment-input:hover {
  border: 1px solid var(--mainThemeColor);
}

.comment-emoji-btn {
  color: var(--subFontColor);
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;
}

.comment-emoji-btn:hover {
  color: var(--mainThemeColor);
}

.comment-content-body {
  /*border-bottom: 1px solid var(--borderColor);*/
}


.comment-reply-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.comment-list-title {
  font-weight: 600;
  color: var(--fontColor);
}

.comment-text {
  color: var(--fontColor);
  font-size: 14px;
}

.comment-user-name {
  color: var(--subFontColor);
  font-size: 15px;
}

.comment-date {
  color: var(--subFontColor);
  font-size: 14px;
}

.comment-reply-list {
  background-color: var(--bodyBgColor);
}

.comment-load-btn {
  height: 50px;
  line-height: 50px;
  background-color: var(--bodyBgColor);
  text-align: center;
  font-size: 15px;
}
</style>