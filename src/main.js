import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '/public/custom_element/theme/index.css'
import skeleton from 'vue-skeleton-component'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'font-awesome/css/font-awesome.min.css'
import filters from './filters/index'
import api from './api/index'
import 'element-ui/lib/theme-chalk/display.css';
import store from './store/index';
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueMeta from 'vue-meta';
import VueLazyload from 'vue-lazyload'
import './directive/directive'
import jQuery from 'jquery'

Vue.prototype.$ = jQuery
Vue.use(skeleton)
Vue.use(ElementUI)
Vue.use(Viewer)
Vue.use(VueMeta)
Vue.use(VueLazyload, {
    preLoad: 1.3,
    lazyComponent: true,
    attempt: 1
})
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
Vue.prototype.$api = api
Vue.config.productionTip = false

// new Vue({
//     el: '#app',
//     router,
//     components: {App},
//     template: '<App/>',
//     store
// })
new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
