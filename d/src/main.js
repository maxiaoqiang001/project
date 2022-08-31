import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import './assets/animate.css'
import './assets/common.css'
import router from './router'
import store from './store'
import utils from './utils'
import echarts from 'echarts' //引入echarts
import 'echarts/map/js/china.js' //引入中国地图
import 'echarts/map/json/china'

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.utils = utils; //引入组件
Vue.prototype.Echarts = echarts; //引入组件

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
