<template>
  <div class="tab-list-content">
    <el-row class="tab-list-row">
      <el-col class="mx-2" :xl="2" :sm="3" :xs="4" v-for="tab in tabList" :key="tab.type">
        <el-link :underline="false" class="text-decoration-none" :class="selectType === tab.type ? 'select-tab' : ''"
                 @click="selectTab(tab.type)">
          {{ tab.text }}
        </el-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ArticleListTab",
  data() {
    return {
      tabList: [
        {text: '最新文章', orderBy: '', type: 1},
        {text: '最热文章', orderBy: '', type: 2}
      ],
      selectType: 1
    }
  },
  methods: {
    selectTab(selectType) {
      this.selectType = selectType;
      this.$emit('change-query-type', selectType)
    }
  }
}
</script>

<style scoped>
.tab-list-content {
  background-color: var(--bgColor);
  border-bottom: 1px solid var(--borderColor);
  height: 50px;
  line-height: 50px;
}

.select-tab {
  color: var(--mainThemeColor) !important;
}

</style>