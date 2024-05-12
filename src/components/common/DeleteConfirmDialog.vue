<template>
  <el-dialog
      title="提示"
      :visible.sync="deleteConfirmDialogVisible"
      width="20%" top="30vh">
    <span>{{confirmMsg}}</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="onCancel">取 消</el-button>
    <el-button type="primary" @click="onOk">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: "DeleteConfirmDialog",
  data() {
    return {
      deleteConfirmDialogVisible: false,
      deleteItemId: null
    }
  },
  props: {
    confirmMsg: {
      type: String,
      default: "是否删除这项内容？"
    },
    cancel: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onOk() {
      this.$emit("ok", this.deleteItemId)
      this.deleteConfirmDialogVisible = false;
    },
    onCancel() {
      this.cancel();
      this.deleteConfirmDialogVisible = false;
    }
  }
}
</script>

<style scoped>

</style>