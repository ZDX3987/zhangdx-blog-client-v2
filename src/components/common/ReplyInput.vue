<template>
  <div class="d-inline-block w-100 mt-2" @click.stop="replyClick">
    <div>
      <textarea class="reply-input" ref="replyInput" placeholder="发表你的看法" rows="3" v-model="replyText"></textarea>
    </div>
    <div>
<!--      <a class="fa fa-smile-o reply-emoji-btn d-inline-block" title="添加表情">&nbsp;表情</a>-->
      <el-button type="success" class="d-inline-block float-right" :disabled="!replyText" @click="saveReply">回复
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReplyInput",
  data() {
    return {
      replyText: '',

    }
  },
  created() {
    document.addEventListener('click', () => {
      this.$emit('reply-blur', '');
    });
  },
  mounted() {
    this.$refs.replyInput.focus();
  },
  methods: {
    saveReply() {
      this.$emit('save-reply', this.replyText);
      this.replyText = '';
      this.$emit('reply-blur', '');
    },
    replyClick() {
    },
  },
  destroyed() {
    document.removeEventListener('click', () => {
    });
  }
}
</script>

<style scoped>
.reply-input {
  width: 100%;
  max-height: 100px;
  resize: none;
  background-color: var(--bgColor);
  transition: all 0.5s;
  font-size: 14px;
  padding-left: 10px;
  padding-top: 5px;
  border: 1px solid var(--mainThemeColor);
  border-radius: 4px;
}

.reply-input:focus,
.reply-input:hover {
  border: 1px solid var(--mainThemeColor);
}

.reply-emoji-btn {
  color: var(--subFontColor);
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;
}

.reply-emoji-btn:hover {
  color: var(--mainThemeColor);
}
</style>