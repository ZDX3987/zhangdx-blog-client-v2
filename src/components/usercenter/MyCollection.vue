<template>
  <el-container>
    <el-aside class="collection-aside">
      <div class="collection-header my-2 px-4">
        我的创建
        <el-button icon="iconfont iconxinwenjianjia" type="text" @click="showEditDialog"></el-button>
      </div>
      <empty-list v-if="collectionList.length === 0" :emptySize="8" description="收藏夹为空哦~" />
        <ul class="collection-list">
          <li class="pl-4 pr-3 collection-item" :class="activeCollectionId === item.id ? 'collection-item-active' : ''"
              v-for="(item, index) in collectionList" :key="index" @click="choseCollectionItem(item.id)">
            <span class="iconfont mr-1" :class="item.privatized ? 'iconfolder6wenjianjia' : 'iconwenjianjia'"/>
            {{item.name}}
            <el-dropdown class="more-edit" @command="handleCollectionEdit">
              <span class="float-right iconfont icongengduo-shuxiang"/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{operate: 1, index: index}">编辑</el-dropdown-item>
                <el-dropdown-item :command="{operate: 2, index: index}" divided :disabled="item.sysDefault">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
    </el-aside>
    <el-main>
      <el-tabs v-model="activeName" type="card" @tab-click="">
        <el-tab-pane label="用户管理" name="first">
          <article-list/>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-main>
    <collection-edit-dialog ref="collectionEditDialog" @query-collection="getMyCollectionList"/>
    <delete-confirm-dialog ref="deleteDialog" @ok="deleteCollection"/>
  </el-container>
</template>

<script>
import CollectionEditDialog from '@/components/dialog/CollectionEditDialog';
import EmptyList from '@/components/common/EmptyList';
import DeleteConfirmDialog from '@/components/common/DeleteConfirmDialog';
import ArticleList from '@/components/article/ArticleList';

export default {
  name: "MyCollection",
  data() {
    return {
      collectionList: [],
      activeCollectionId: 1,
      activeName: ""
    }
  },
  components: {
    CollectionEditDialog,
    EmptyList,
    DeleteConfirmDialog,
    ArticleList
  },
  created() {
    this.getMyCollectionList();
  },
  methods: {
    getMyCollectionList() {
      this.$api.homepage.getMyCollectionList().then(res => {
        this.collectionList = res.data;
        this.activeCollectionId = this.collectionList[0].id;
      }).catch(e => {})
    },

    choseCollectionItem(itemId) {
      this.activeCollectionId = itemId;
    },
    showEditDialog() {
      this.$refs.collectionEditDialog.collectionEditDialogVisible = true;
    },
    handleCollectionEdit(command) {
      let collectionListElement = this.collectionList[command.index];
      if (command.operate === 1) {
        this.$refs.collectionEditDialog.setCollectionEditForm(collectionListElement);
        this.showEditDialog();
      } else if (command.operate === 2) {
        this.$refs.deleteDialog.deleteItemId = collectionListElement.id;
        this.$refs.deleteDialog.deleteConfirmDialogVisible = true;
      }
    },
    deleteCollection(id) {
      this.$api.homepage.deleteCollection(id).then(() => {
        this.$message.success("删除成功");
        this.getMyCollectionList();
      }).catch(error => {
        this.$message.error(error.msg);
      });
    }
  }
}
</script>

<style scoped>
.collection-aside {
  border-right: 1px solid var(--borderColor);
  text-align: left;
  padding: 0;
  height: 100%;
  min-height: 300px;
}
.collection-header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
}
.collection-header span {
  font-size: 18px;
}
.collection-list {
  list-style: none;
  padding-left: 0;
}
.collection-item {
  height: 50px;
  line-height: 50px;
  cursor: pointer;
}
.collection-item:not(.collection-item-active):hover {
  background: var(--bodyBgColor);
  color: var(--mainThemeColor);
}
.collection-item-active {
  background: var(--mainThemeColor);
  color: var(--btnText);
}
.collection-item span {
  font-size: 20px;
}
.collection-item .more-edit{
  float: right;
}
</style>