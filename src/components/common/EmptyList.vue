<template>
<el-row class="empty-content" type="flex" justify="center">
  <el-col class="my-5" :span="emptySize">
    <el-empty>
      <span slot="description" class="description">
        {{description}}
      </span>
    </el-empty>
  </el-col>
</el-row>
</template>

<script>
export default {
  name: "EmptyList",
  props: {
    emptySize: {
      type: Number,
      default: 4
    },
    description: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style scoped>
.empty-content {
  color: var(--fontColor);
}
.el-empty {
  text-align: center;
}
.description {
  font-size: 13px;
  color: var(--subFontColor);
}
</style>