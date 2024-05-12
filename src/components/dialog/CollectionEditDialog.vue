<template>
  <el-dialog title="编辑收藏夹" :visible.sync="collectionEditDialogVisible" @close="closeDialog" width="20%" top="30vh">
    <el-form :model="collectionEditForm" ref="form" :rules="rules" class="dialog-form">
      <el-form-item label="名称" prop="name">
        <el-input v-model="collectionEditForm.name" placeholder="收藏夹名称" maxlength="20" show-word-limit autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" class="mb-0">
        <el-input v-model="collectionEditForm.description" type="textarea" rows="8" placeholder="收藏夹描述"
                  maxlength="300" show-word-limit autocomplete="off" resize="none"></el-input>
      </el-form-item>
      <el-form-item class="mb-0">
        <el-checkbox v-model="collectionEditForm.privatized" :true-label="1" :false-label="0" label="私密收藏夹"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitEdit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "CollectionEditDialog",
  data() {
    return {
      collectionEditDialogVisible: false,
      collectionEditForm: {
        name: '',
        description: '',
        privatized: 0
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitEdit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$api.homepage.editCollection(this.collectionEditForm).then(res => {
            this.$message.success("保存成功");
            this.collectionEditDialogVisible = false;
            this.$emit("query-collection", true)
          })
        } else {
          return false;
        }
      })
    },
    setCollectionEditForm(form) {
      this.collectionEditForm = form;
    },
    closeDialog() {
      this.collectionEditForm = {
        name: '',
        description: '',
        privatized: 0
      }
    }
  }
}
</script>

<style scoped>
.dialog-form {
  text-align: left;
}
</style>