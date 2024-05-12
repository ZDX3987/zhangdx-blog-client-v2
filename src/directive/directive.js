import Vue from 'vue';
import Router from '../router/index'
import content from '../api/content'

Vue.directive('content', {
    bind: (el, binding) => {
        let path = Router.currentRoute.path;
        let value = binding.value;
        if (!path || !value) {
            return;
        }
        content.getContentByRouter(path, value).then(res => {
            if (!res.data) {
                return;
            }
            el.innerHTML = res.data.html;
        }).catch(error => this.$message.error('页面内容加载失败'));
    }
})